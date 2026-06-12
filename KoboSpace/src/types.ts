// Tipi condivisi dell'applicazione Kobo Space

export type DeskType = 'hot-desk' | 'fixed-desk' | 'private-office' | 'meeting-room';

export interface DeskOption {
  type: DeskType;
  label: string;
  description: string;
  pricePerDay: number; // EUR
  available: number;
}

export interface Location {
  id: string;
  slug: string;
  name: string;
  city: string;
  address: string;
  shortDescription: string;
  description: string;
  image: string;
  rating: number;
  amenities: string[];
  openingHours: string;
  desks: DeskOption[];
}

export interface BookingDraft {
  locationId: string | null;
  deskType: DeskType | null;
  date: string | null; // ISO yyyy-mm-dd
  seats: number;
}

export interface BookingRequestData extends BookingDraft {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  notes: string;
}
