export interface AvailabilitySlot {
  id: string;
  startAt?: string;
  endAt?: string;
  note?: string;
  booked?: boolean;
}

export interface Listing {
  id: string;
  title: string;
  description: string;
  itinerary: string;
  price: number;
  durationHours: number;
  meetingPoint: string;
  maxGroupSize: number;
  city: string;
  category: string;
  currency: string;
  images: string;
  isActive: boolean;
  guideId: string;
  guide: {
    id: string;
    name: string;
    email: string;
    profilePhoto: string;
    bio: string;
  };
  availabilities: AvailabilitySlot[];
  bookings: unknown[];
  reviews: unknown[];
  createdAt: string;
  updatedAt: string;
}

export interface ListingsResponse {
  success: boolean;
  message: string;
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: Listing[];
}
