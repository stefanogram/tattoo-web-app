
export type Booking = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  bookingDate: Date;
  submittedAt: Date;
};
