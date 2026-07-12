export interface BookingInput {
  serviceId: string;
  customerName: string;
  phoneNumber: string;
  bookingDate: string; 
  timeSlot: string;
  notes: string;
  price: number;
}