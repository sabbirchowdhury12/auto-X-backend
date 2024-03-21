type TBookingFilterRequest = {
  searchTerm?: string | undefined;
  rentType?: string | undefined;
  bookingStatus?: string | undefined;
  paymentStatus?: string | undefined;
};

export { TBookingFilterRequest };
