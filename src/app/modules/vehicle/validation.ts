import {
  EFuelType,
  EVehicleBrand,
  EVehicleStatus,
  EVehicleType,
} from '@prisma/client';
import { z } from 'zod';

const ZCreateVehicle = z.object({
  body: z.object({
    model: z.string({ required_error: 'Modle is required!' }),
    mileage: z.number({ required_error: 'Mileage is required!' }),
    color: z.string({ required_error: 'Color is required!' }),
    images: z.array(z.string(), { required_error: 'Images is required!' }),
    overview: z.string({ required_error: 'Overview is required!' }),
    basePrice: z.number({ required_error: 'Base price is required!' }).int(),
    fuelType: z.enum([...Object.keys(EFuelType)] as [string, ...string[]], {
      required_error: 'Fuel type is required!',
    }),
    passengerCapacity: z
      .number({ required_error: 'Passenger capacity is required!' })
      .int(),
    location: z.string({ required_error: 'Location is required!' }),
    plateNo: z.string({ required_error: 'Plate number is required!' }),
    chassisNo: z.string({ required_error: 'Chassis number is required!' }),
    status: z
      .enum([...Object.keys(EVehicleStatus)] as [string, ...string[]])
      .default(EVehicleStatus.Available)
      .optional(),
    owner: z.string().optional(),
    vehicleType: z.enum(
      [...Object.keys(EVehicleType)] as [string, ...string[]],
      { required_error: 'Vehicle type is required!' },
    ),
    brand: z.enum([...Object.keys(EVehicleBrand)] as [string, ...string[]], {
      required_error: 'Brand is required!',
    }),
    year: z.string({ required_error: 'Year is required!' }),
    registrationNumber: z.string({
      required_error: 'Registration number is required!',
    }),
    rentalRate: z.number({ required_error: 'Rental rate is required!' }),
    driverId: z.string({ required_error: 'Driver id is required!' }),
  }),
});

const ZUpdateVehicle = z.object({
  body: z.object({
    model: z.string().optional(),
    mileage: z.number().optional(),
    color: z.string().optional(),
    images: z.array(z.string()).optional(),
    overview: z.string().optional(),
    basePrice: z.number().optional(),
    fuelType: z
      .enum([...Object.keys(EFuelType)] as [string, ...string[]])
      .optional(),
    passengerCapacity: z.number().optional(),
    location: z.string().optional(),
    plateNo: z.string().optional(),
    chassisNo: z.string().optional(),
    status: z
      .enum([...Object.keys(EVehicleStatus)] as [string, ...string[]])
      .optional(),
    owner: z.string().optional(),
    vehicleType: z
      .enum([...Object.keys(EVehicleType)] as [string, ...string[]])
      .optional(),
    brand: z
      .enum([...Object.keys(EVehicleBrand)] as [string, ...string[]])
      .optional(),
    year: z.string().optional(),
    registrationNumber: z.string().optional(),
    rentalRate: z.number().optional(),
    driverId: z.string().optional(),
  }),
});

export const VehicleValidation = { ZCreateVehicle, ZUpdateVehicle };
