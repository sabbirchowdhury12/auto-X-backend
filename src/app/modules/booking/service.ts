/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Booking, Prisma } from '@prisma/client';
import prisma from '../../../constants/prisma';
import ApiError from '../../../errors/ApiError';
import { calculatePagination } from '../../../helpers/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import IPaginationOptions from '../../../interfaces/pagination';
import { vehicleRelationalFieldsMapper } from '../vehicle/constants';
import { bookingRelationalFields, bookingSearchableFields } from './constants';
import { TBookingFilterRequest } from './interface';
import { BookingUtils } from './utils';

const createBooking = async (data: Booking): Promise<Booking> => {
  const vehicle = await prisma.vehicle.findUnique({
    where: { id: data.vehicleId },
  });

  if (!vehicle) throw new ApiError(400, 'Vehicle id mismatched!');

  if (vehicle.status !== 'Available')
    throw new ApiError(404, "The vehicle isn't available now!");

  // have to do some error handling via date and time

  data.bookingId = await BookingUtils.generateBookingId();

  const booking = await prisma.booking.create({ data });

  if (!booking) throw new ApiError(400, 'Failed to create booking!');

  await prisma.vehicle.update({
    where: { id: data.vehicleId },
    data: { status: 'In_A_Trip' },
  });

  return booking;
};

const getBooking = async (id: string): Promise<Booking> => {
  const booking = await prisma.booking.findUnique({
    where: { id },
    include: {
      user: {
        include: {
          profile: true,
        },
      },
      vehicle: {
        include: {
          driver: true,
        },
      },
    },
  });

  if (!booking) throw new ApiError(404, 'Booking not found!');

  return booking;
};

const getBookings = async (
  { searchTerm, ...filterData }: TBookingFilterRequest,
  options: IPaginationOptions,
): Promise<IGenericResponse<Booking[]>> => {
  const pipeline = [];
  const { limit, page, skip } = calculatePagination(options);

  if (searchTerm) {
    pipeline.push({
      OR: bookingSearchableFields.map(field => ({
        [field]: { contains: searchTerm, mode: 'insensitive' },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    pipeline.push({
      AND: Object.keys(filterData).map(key => {
        if (bookingRelationalFields.includes(key)) {
          return {
            [vehicleRelationalFieldsMapper[key]]: {
              id: (filterData as any)[key],
            },
          };
        } else {
          return { [key]: { equals: (filterData as any)[key] } };
        }
      }),
    });
  }

  const where: Prisma.BookingWhereInput =
    pipeline.length > 0 ? { AND: pipeline } : {};

  const total = await prisma.booking.count({ where });

  const data = await prisma.booking.findMany({
    include: { user: true, vehicle: true },
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

const updateBooking = async (
  id: string,
  payload: Partial<Booking>,
): Promise<Booking> => {
  const booking = await prisma.booking.update({
    where: { id },
    data: payload,
    include: { user: true, vehicle: true },
  });

  return booking;
};

const deleteBooking = async (id: string): Promise<Booking> => {
  const booking = await prisma.booking.delete({ where: { id } });

  if (!booking) throw new ApiError(400, 'Failed to delete booking!');

  return booking;
};

export const BookingService = {
  createBooking,
  getBooking,
  getBookings,
  updateBooking,
  deleteBooking,
};
