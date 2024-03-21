const bookingSearchableFields: string[] = [
  'pickUpLocation',
  'dropOffLocation',
  'userId',
  'vehicleId',
];

const bookingFilterableFields: string[] = [
  'searchTerm',
  'rentType',
  'bookingStatus',
  'paymentStatus',
];

const bookingRelationalFields: string[] = ['vehicleId', 'userId', 'driverId'];

const bookingRelationalFieldsMapper: { [key: string]: string } = {
  vehicleId: 'vehicle',
  userId: 'user',
  driverId: 'driver',
};

export {
  bookingFilterableFields,
  bookingRelationalFields,
  bookingRelationalFieldsMapper,
  bookingSearchableFields,
};
