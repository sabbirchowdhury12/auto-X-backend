const vehicleSearchableFields: string[] = [
  'model',
  'color',
  'location',
  'year',
];

const vehicleFilterableFields: string[] = [
  'searchTerm',
  'vehicleId',
  'model',
  'color',
  'basePrice',
  'fuelType',
  'passengerCapacity',
  'location',
  'status',
  'vehicleType',
  'brand',
  'year',
  'rentalRate',
];

const vehicleRelationalFields: string[] = ['driverId'];

const vehicleRelationalFieldsMapper: { [key: string]: string } = {
  driverId: 'driver',
};

export {
  vehicleFilterableFields,
  vehicleRelationalFields,
  vehicleRelationalFieldsMapper,
  vehicleSearchableFields,
};
