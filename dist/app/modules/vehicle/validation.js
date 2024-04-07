"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleValidation = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const ZCreateVehicle = zod_1.z.object({
    body: zod_1.z.object({
        model: zod_1.z.string({ required_error: 'Modle is required!' }),
        mileage: zod_1.z.number({ required_error: 'Mileage is required!' }),
        color: zod_1.z.string({ required_error: 'Color is required!' }),
        images: zod_1.z.array(zod_1.z.string(), { required_error: 'Images is required!' }),
        overview: zod_1.z.string({ required_error: 'Overview is required!' }),
        basePrice: zod_1.z.number({ required_error: 'Base price is required!' }).int(),
        fuelType: zod_1.z.enum([...Object.keys(client_1.EFuelType)], {
            required_error: 'Fuel type is required!',
        }),
        passengerCapacity: zod_1.z
            .number({ required_error: 'Passenger capacity is required!' })
            .int(),
        location: zod_1.z.string({ required_error: 'Location is required!' }),
        plateNo: zod_1.z.string({ required_error: 'Plate number is required!' }),
        chassisNo: zod_1.z.string({ required_error: 'Chassis number is required!' }),
        status: zod_1.z
            .enum([...Object.keys(client_1.EVehicleStatus)])
            .default(client_1.EVehicleStatus.Available)
            .optional(),
        owner: zod_1.z.string().optional(),
        vehicleType: zod_1.z.enum([...Object.keys(client_1.EVehicleType)], { required_error: 'Vehicle type is required!' }),
        brand: zod_1.z.enum([...Object.keys(client_1.EVehicleBrand)], {
            required_error: 'Brand is required!',
        }),
        year: zod_1.z.string({ required_error: 'Year is required!' }),
        registrationNumber: zod_1.z.string({
            required_error: 'Registration number is required!',
        }),
        rentalRate: zod_1.z.number({ required_error: 'Rental rate is required!' }),
        driverId: zod_1.z.string({ required_error: 'Driver id is required!' }),
    }),
});
const ZUpdateVehicle = zod_1.z.object({
    body: zod_1.z.object({
        model: zod_1.z.string().optional(),
        mileage: zod_1.z.number().optional(),
        color: zod_1.z.string().optional(),
        images: zod_1.z.array(zod_1.z.string()).optional(),
        overview: zod_1.z.string().optional(),
        basePrice: zod_1.z.number().optional(),
        fuelType: zod_1.z
            .enum([...Object.keys(client_1.EFuelType)])
            .optional(),
        passengerCapacity: zod_1.z.number().optional(),
        location: zod_1.z.string().optional(),
        plateNo: zod_1.z.string().optional(),
        chassisNo: zod_1.z.string().optional(),
        status: zod_1.z
            .enum([...Object.keys(client_1.EVehicleStatus)])
            .optional(),
        owner: zod_1.z.string().optional(),
        vehicleType: zod_1.z
            .enum([...Object.keys(client_1.EVehicleType)])
            .optional(),
        brand: zod_1.z
            .enum([...Object.keys(client_1.EVehicleBrand)])
            .optional(),
        year: zod_1.z.string().optional(),
        registrationNumber: zod_1.z.string().optional(),
        rentalRate: zod_1.z.number().optional(),
        driverId: zod_1.z.string().optional(),
    }),
});
exports.VehicleValidation = { ZCreateVehicle, ZUpdateVehicle };
