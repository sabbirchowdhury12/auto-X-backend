import { Driver } from '@prisma/client';
import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { TCreateDriverResponse } from './interface';
import { DriverService } from './service';

const createDriver = catchAsync(async (req: Request, res: Response) => {
  const data = await DriverService.createDriver(req.body);

  console.log(data);

  sendResponse<TCreateDriverResponse>(res, {
    statusCode: 201,
    success: true,
    message: 'Driver created successfully',
    data,
  });
});

const availableDrivers = catchAsync(async (req: Request, res: Response) => {
  const { date } = req.query; // Assuming the date is passed as a query parameter

  const data = await DriverService.availableDrivers(date as string);
  sendResponse<Driver[]>(res, {
    statusCode: 200,
    success: true,
    message: 'Available Drivers retrieve successfully!',
    data,
  });
});
const getDrivers = catchAsync(async (req: Request, res: Response) => {
  const data = await DriverService.getDrivers();

  sendResponse<Driver[]>(res, {
    statusCode: 200,
    success: true,
    message: 'Drivers retrieve successfully!',
    data,
  });
});
const getDriver = catchAsync(async (req: Request, res: Response) => {
  const data = await DriverService.getDriver(req.params.id);

  sendResponse<Driver>(res, {
    statusCode: 200,
    success: true,
    message: 'Driver retrieve successfully!',
    data,
  });
});

const updateDriver = catchAsync(async (req: Request, res: Response) => {
  const data = await DriverService.updateDriver(req.params.id, req.body);

  sendResponse<Driver>(res, {
    statusCode: 200,
    success: true,
    message: 'Driver updated successfully!',
    data,
  });
});

const deleteDriver = catchAsync(async (req: Request, res: Response) => {
  const data = await DriverService.deleteDriver(req.params.id);

  sendResponse<Driver>(res, {
    statusCode: 200,
    success: true,
    message: 'Driver Deleted successfully!',
    data,
  });
});

export const DriverController = {
  createDriver,
  availableDrivers,
  getDrivers,
  getDriver,
  updateDriver,
  deleteDriver,
};
