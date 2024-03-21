import { Booking } from '@prisma/client';
import { Request, Response } from 'express';
import paginationFields from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { bookingFilterableFields } from './constants';
import { BookingService } from './service';

const createBooking = catchAsync(async (req: Request, res: Response) => {
  const data = await BookingService.createBooking(req.body);

  sendResponse<Booking>(res, {
    statusCode: 201,
    success: true,
    message: 'Booking created successfully',
    data,
  });
});

const getBooking = catchAsync(async (req: Request, res: Response) => {
  const data = await BookingService.getBooking(req.params.id);

  sendResponse<Booking>(res, {
    statusCode: 200,
    success: true,
    message: 'Booking retrieved successfully',
    data,
  });
});

const getBookings = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, bookingFilterableFields);
  const options = pick(req.query, paginationFields);

  const { meta, data } = await BookingService.getBookings(filters, options);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Bookings retrieved successfully',
    meta,
    data,
  });
});

const updateBooking = catchAsync(async (req: Request, res: Response) => {
  const data = await BookingService.updateBooking(req.params.id, req.body);

  sendResponse<Booking>(res, {
    statusCode: 200,
    success: true,
    message: 'Booking updated successfully',
    data,
  });
});

const deleteBooking = catchAsync(async (req: Request, res: Response) => {
  const data = await BookingService.deleteBooking(req.params.id);

  sendResponse<Booking>(res, {
    statusCode: 200,
    success: true,
    message: 'Booking deleted successfully',
    data,
  });
});

export const BookingController = {
  createBooking,
  getBooking,
  getBookings,
  updateBooking,
  deleteBooking,
};
