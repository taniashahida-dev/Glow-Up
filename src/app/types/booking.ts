import { Service } from "./service";

export interface BookingInput {
  serviceId: string;
  customerName: string;
  phoneNumber: string;
  bookingDate: string;
  timeSlot: string;
  notes: string;
  price: number;
}

export type BookingStatus = "pending" | "confirmed" | "completed" | "cancelled";

// Shape of a booking document as returned by GET /api/bookings/my-bookings
export interface Booking {
  _id: string;
  userId: string;
  serviceId: string;
  customerName: string;
  phoneNumber: string;
  bookingDate: string;
  time: string;
  notes: string;
  status: BookingStatus;
  price: number;
  createdAt: string;
  serviceDetails?: Service;
}

export interface CreateBookingResponse {
  success: boolean;
  message: string;
  insertedId: string;
}