/* eslint-disable @typescript-eslint/no-explicit-any */
import { Prisma, Vehicle } from '@prisma/client';
import prisma from '../../../constants/prisma';
import ApiError from '../../../errors/ApiError';
import { calculatePagination } from '../../../helpers/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import IPaginationOptions from '../../../interfaces/pagination';
import {
  vehicleRelationalFields,
  vehicleRelationalFieldsMapper,
  vehicleSearchableFields,
} from './constants';
import { TVehicleFilterRequest } from './interface';
import { VehicleUtils } from './utils';

const createVehicle = async (data: Vehicle): Promise<Vehicle> => {
  data.vehicleId = await VehicleUtils.generateVehicleId(data.vehicleType);

  const vehicle = await prisma.vehicle.create({ data });

  if (!vehicle) throw new ApiError(400, 'Failed to created vahicle!');

  return vehicle;
};

const getVehicle = async (id: string): Promise<Vehicle> => {
  const vehicle = await prisma.vehicle.findUnique({ where: { id } });

  if (!vehicle) throw new ApiError(404, 'Vehicle not found!');

  return vehicle;
};

const getVehicles = async (
  { searchTerm, ...filterData }: TVehicleFilterRequest,
  options: IPaginationOptions,
): Promise<IGenericResponse<Vehicle[]>> => {
  const pipeline = [];
  const { limit, page, skip } = calculatePagination(options);

  if (searchTerm) {
    pipeline.push({
      OR: vehicleSearchableFields.map(field => ({
        [field]: { contains: searchTerm, mode: 'insensitive' },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    pipeline.push({
      AND: Object.keys(filterData).map(key => {
        if (vehicleRelationalFields.includes(key)) {
          return {
            [vehicleRelationalFieldsMapper[key]]: {
              id: (filterData as any)[key],
            },
          };
        } else {
          return {
            [key]: { equals: (filterData as any)[key] },
          };
        }
      }),
    });
  }

  const where: Prisma.VehicleWhereInput =
    pipeline.length > 0 ? { AND: pipeline } : {};

  const total = await prisma.vehicle.count({ where });

  const data = await prisma.vehicle.findMany({
    include: { driver: true },
    where,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : { createdAt: 'desc' },
  });

  return { meta: { total, page, limit }, data };
};
const getAllVehicles = async () => {
  const allVehicles = await prisma.vehicle.findMany({});
  const totalVehicle = await prisma.vehicle.count({});
  const availeVehicle = await prisma.vehicle.count({
    where: { status: 'Available' },
  });
  const resreveVehicle = await prisma.vehicle.count({
    where: { status: 'In_A_Trip' },
  });

  return { data: { totalVehicle, availeVehicle, resreveVehicle, allVehicles } };
};

const availableVehicles = async (): Promise<Vehicle[]> => {
  const availableVehicles = await prisma.vehicle.findMany({
    where: {
      status: 'Available',
    },
  });
  // Query all booked drivers for the provided date
  // const bookedVehicleIds = (
  //   await prisma.booking.findMany({
  //     where: {
  //       pickUpDateTime,
  //     },
  //     select: {
  //       vehicleId: true,
  //     },
  //   })
  // ).map(booking => booking.vehicleId);

  // // Query available drivers by excluding booked drivers
  // const availableVehicale = await prisma.vehicle.findMany({
  //   where: {
  //     id: {
  //       notIn: bookedVehicleIds,
  //     },
  //   },
  // });

  return availableVehicles;
};

const updateVehicle = async (
  id: string,
  payload: Partial<Vehicle>,
): Promise<Vehicle> => {
  const vehicle = await prisma.vehicle.update({
    where: { id },
    data: payload,
    include: { driver: true },
  });

  return vehicle;
};

const deleteVehicle = async (id: string): Promise<Vehicle> => {
  const vehicle = await prisma.vehicle.delete({ where: { id } });

  if (!vehicle) throw new ApiError(400, 'Failed to delete vehicle!');

  return vehicle;
};

export const VehicleService = {
  createVehicle,
  getVehicle,
  getVehicles,
  updateVehicle,
  availableVehicles,
  deleteVehicle,
  getAllVehicles,
};
