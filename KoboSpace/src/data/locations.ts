import type { DeskOption, DeskType, Location } from '../types';
import shibuyaImg from '../assets/locations/shibuya.webp';
import shinjukuImg from '../assets/locations/shinjuku.webp';
import roppongiImg from '../assets/locations/roppongi.webp';
import ginzaImg from '../assets/locations/ginza.webp';
import nakameguroImg from '../assets/locations/nakameguro.webp';
import marunouchiImg from '../assets/locations/marunouchi.webp';

export const DESK_TYPE_LABELS: Record<DeskType, string> = {
  'hot-desk': 'Hot desk',
  'fixed-desk': 'Dedicated desk',
  'private-office': 'Private office',
  'meeting-room': 'Meeting room',
};

// Tokyo è una città molto costosa: prezzi in yen giapponesi.
export const formatPrice = (value: number): string =>
  `¥${value.toLocaleString('en-US')}`;

const baseDesks: DeskOption[] = [
  {
    type: 'hot-desk',
    label: DESK_TYPE_LABELS['hot-desk'],
    description: 'A free seat in the shared area. Pick a different spot every day.',
    pricePerDay: 2500,
    available: 24,
  },
  {
    type: 'fixed-desk',
    label: DESK_TYPE_LABELS['fixed-desk'],
    description: 'Your own reserved desk with monitor and personal drawer unit.',
    pricePerDay: 4200,
    available: 8,
  },
  {
    type: 'private-office',
    label: DESK_TYPE_LABELS['private-office'],
    description: 'A lockable office for your team, up to 6 people.',
    pricePerDay: 16000,
    available: 3,
  },
  {
    type: 'meeting-room',
    label: DESK_TYPE_LABELS['meeting-room'],
    description: 'A fully equipped meeting room with screen and video conferencing.',
    pricePerDay: 8000,
    available: 2,
  },
];

export const locations: Location[] = [
  {
    id: 'shibuya',
    slug: 'shibuya',
    name: 'Kobo Space Shibuya',
    city: 'Shibuya',
    address: '2-24-12 Shibuya, Shibuya City, Tokyo',
    shortDescription: 'In the heart of Tokyo, steps from Shibuya Crossing.',
    description:
      'Our flagship location in a bright, refurbished building. Floor-to-ceiling windows and a vibrant community of startups and creative freelancers.',
    image: shibuyaImg,
    rating: 4.8,
    amenities: ['Gigabit Wi-Fi', 'Unlimited coffee', 'Phone booths', 'Printing', 'Bike parking'],
    openingHours: 'Mon–Fri 8:00–20:00',
    desks: baseDesks,
  },
  {
    id: 'shinjuku',
    slug: 'shinjuku',
    name: 'Kobo Space Shinjuku',
    city: 'Shinjuku',
    address: '3-15-7 Shinjuku, Shinjuku City, Tokyo',
    shortDescription: 'A calm workspace above the buzz of Shinjuku.',
    description:
      'A bright, focused space on a high floor with skyline views. Perfect for deep work, with great coffee always within reach.',
    image: shinjukuImg,
    rating: 4.6,
    amenities: ['Gigabit Wi-Fi', 'Rooftop terrace', 'Unlimited coffee', 'Relax area', 'Lockers'],
    openingHours: 'Mon–Fri 8:30–19:30',
    desks: baseDesks.filter((d) => d.type !== 'private-office'),
  },
  {
    id: 'roppongi',
    slug: 'roppongi',
    name: 'Kobo Space Roppongi',
    city: 'Roppongi',
    address: '6-10-1 Roppongi, Minato City, Tokyo',
    shortDescription: 'An industrial space in the art district of Roppongi.',
    description:
      'Exposed concrete, large glass walls and an open-plan layout built for focus. A favourite among developers and designers.',
    image: roppongiImg,
    rating: 4.7,
    amenities: ['Gigabit Wi-Fi', 'Unlimited coffee', '4 phone booths', 'Event space', 'Printing'],
    openingHours: 'Mon–Fri 8:00–21:00',
    desks: baseDesks,
  },
  {
    id: 'ginza',
    slug: 'ginza',
    name: 'Kobo Space Ginza',
    city: 'Ginza',
    address: '4-6-16 Ginza, Chuo City, Tokyo',
    shortDescription: 'A refined address in Tokyo’s premier shopping district.',
    description:
      'An elegant space near the boutiques of Ginza, ideal for consultants, small teams and client meetings. Networking events every week.',
    image: ginzaImg,
    rating: 4.5,
    amenities: ['Gigabit Wi-Fi', 'Unlimited coffee', 'Meeting room', 'Weekly events'],
    openingHours: 'Mon–Sat 8:00–20:00',
    desks: baseDesks.filter((d) => d.type !== 'meeting-room'),
  },
  {
    id: 'nakameguro',
    slug: 'nakameguro',
    name: 'Kobo Space Nakameguro',
    city: 'Nakameguro',
    address: '1-22-5 Kamimeguro, Meguro City, Tokyo',
    shortDescription: 'A sunny space along the Meguro River.',
    description:
      'The most relaxed location in the network, with balconies overlooking the cherry-tree-lined river. A warm community and plenty of social events.',
    image: nakameguroImg,
    rating: 4.9,
    amenities: ['Gigabit Wi-Fi', 'Riverside balconies', 'Unlimited coffee', 'Relax area'],
    openingHours: 'Mon–Fri 9:00–19:00',
    desks: baseDesks,
  },
  {
    id: 'marunouchi',
    slug: 'marunouchi',
    name: 'Kobo Space Marunouchi',
    city: 'Marunouchi',
    address: '2-4-1 Marunouchi, Chiyoda City, Tokyo',
    shortDescription: 'A polished workspace in the business district.',
    description:
      'Steps from Tokyo Station, a carefully designed space for professionals who value a quiet, premium environment.',
    image: marunouchiImg,
    rating: 4.7,
    amenities: ['Gigabit Wi-Fi', 'Unlimited coffee', 'Phone booths', 'Meeting room', 'Lockers'],
    openingHours: 'Mon–Fri 8:30–20:00',
    desks: baseDesks,
  },
];

export const getLocationBySlug = (slug: string): Location | undefined =>
  locations.find((l) => l.slug === slug);

export const getLocationById = (id: string): Location | undefined =>
  locations.find((l) => l.id === id);

export const allAreas = (): string[] =>
  Array.from(new Set(locations.map((l) => l.city))).sort();
