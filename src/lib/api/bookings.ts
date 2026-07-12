import { BookingInput } from "@/app/types/booking";
import { serverMutation } from "../core/server";
import { getAccessToken } from "./token";

export const createBooking = async (bookingData: BookingInput): Promise<{ success: boolean; message: string; insertedId: string }> => {
    const token = await getAccessToken()
  return serverMutation<{ success: boolean; message: string; insertedId: string }>(
    "/api/bookings", 
    bookingData, 
    "POST",
    token
  );
};