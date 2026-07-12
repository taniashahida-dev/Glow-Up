

import { Booking, BookingInput, CreateBookingResponse } from "@/app/types/booking";
import { serverFetch, serverMutation } from "../core/server";
import { getAccessToken } from "./token";



// User only — create a new appointment/booking
export const createBooking = async (
  bookingData: BookingInput
): Promise<CreateBookingResponse> => {
  const token = await getAccessToken();
  return serverMutation<CreateBookingResponse>("/api/bookings", bookingData, "POST", token);
};

// User only — get the logged-in user's bookings (with joined service details)
export const getMyBookings = async (): Promise<Booking[]> => {
  const token = await getAccessToken();
  return serverFetch<Booking[]>("/api/bookings/my-bookings", {}, token);
};