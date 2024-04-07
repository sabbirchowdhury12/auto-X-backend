"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingSearchableFields = exports.bookingRelationalFieldsMapper = exports.bookingRelationalFields = exports.bookingFilterableFields = void 0;
const bookingSearchableFields = [
    'pickUpLocation',
    'dropOffLocation',
    'userId',
    'vehicleId',
];
exports.bookingSearchableFields = bookingSearchableFields;
const bookingFilterableFields = [
    'searchTerm',
    'rentType',
    'bookingStatus',
    'paymentStatus',
];
exports.bookingFilterableFields = bookingFilterableFields;
const bookingRelationalFields = ['vehicleId', 'userId', 'driverId'];
exports.bookingRelationalFields = bookingRelationalFields;
const bookingRelationalFieldsMapper = {
    vehicleId: 'vehicle',
    userId: 'user',
    driverId: 'driver',
};
exports.bookingRelationalFieldsMapper = bookingRelationalFieldsMapper;
