import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { BookingRequestData, DeskType } from '../types';

export interface SubmittedRequest extends BookingRequestData {
  id: string;
  submittedAt: string;
}

interface BookingState {
  // Bozza di prenotazione condivisa tra le pagine
  locationId: string | null;
  deskType: DeskType | null;
  date: string | null;
  seats: number;

  // Storico delle richieste inviate (lato demo, in memoria/persistito)
  requests: SubmittedRequest[];

  // Azioni
  setLocation: (locationId: string) => void;
  setDeskType: (deskType: DeskType) => void;
  setDate: (date: string) => void;
  setSeats: (seats: number) => void;
  resetDraft: () => void;
  submitRequest: (
    contact: Pick<BookingRequestData, 'fullName' | 'email' | 'phone' | 'company' | 'notes'>,
  ) => SubmittedRequest | null;
  removeRequest: (id: string) => void;
  clearRequests: () => void;
}

const initialDraft = {
  locationId: null,
  deskType: null,
  date: null,
  seats: 1,
};

export const useBookingStore = create<BookingState>()(
  persist(
    (set, get) => ({
      ...initialDraft,
      requests: [],

      setLocation: (locationId) => set({ locationId }),
      setDeskType: (deskType) => set({ deskType }),
      setDate: (date) => set({ date }),
      setSeats: (seats) => set({ seats: Math.max(1, seats) }),
      resetDraft: () => set({ ...initialDraft }),

      submitRequest: (contact) => {
        const { locationId, deskType, date, seats } = get();
        if (!locationId || !deskType || !date) return null;

        const request: SubmittedRequest = {
          id: crypto.randomUUID(),
          submittedAt: new Date().toISOString(),
          locationId,
          deskType,
          date,
          seats,
          ...contact,
        };

        set((state) => ({
          requests: [request, ...state.requests],
          ...initialDraft,
        }));

        return request;
      },

      removeRequest: (id) =>
        set((state) => ({ requests: state.requests.filter((r) => r.id !== id) })),

      clearRequests: () => set({ requests: [] }),
    }),
    { name: 'kobo-space-booking' },
  ),
);

// Selettore utile: la bozza è completa e pronta per il checkout?
export const selectDraftReady = (s: BookingState): boolean =>
  Boolean(s.locationId && s.deskType && s.date);
