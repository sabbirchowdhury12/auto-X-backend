import { Vehicle } from '@prisma/client';
import { Request, Response } from 'express';
import paginationFields from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { vehicleFilterableFields } from './constants';
import { VehicleService } from './service';

const createVehicle = catchAsync(async (req: Request, res: Response) => {
  const data = await VehicleService.createVehicle(req.body);
  console.log(data);
  sendResponse<Vehicle>(res, {
    statusCode: 201,
    success: true,
    message: 'Vehicle created successfully',
    data,
  });
});

const getVehicle = catchAsync(async (req: Request, res: Response) => {
  const data = await VehicleService.getVehicle(req.params.id);

  sendResponse<Vehicle>(res, {
    statusCode: 200,
    success: true,
    message: 'Vehicle retrieved successfully',
    data,
  });
});

const availableVehicles = catchAsync(async (req: Request, res: Response) => {
  const { pickUpDateTime } = req.query;
  console.log(req.query, 'now');

  const data = await VehicleService.availableVehicles(pickUpDateTime as string);
  sendResponse<Vehicle[]>(res, {
    statusCode: 200,
    success: true,
    message: 'available Vehicles retrieve successfully!',
    data,
  });
});
const getVehicles = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, vehicleFilterableFields);
  const options = pick(req.query, paginationFields);

  const { meta, data } = await VehicleService.getVehicles(filters, options);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Vehicles retrieved successfully',
    meta,
    data,
  });
});

const updateVehicle = catchAsync(async (req: Request, res: Response) => {
  const data = await VehicleService.updateVehicle(req.params.id, req.body);

  sendResponse<Vehicle>(res, {
    statusCode: 200,
    success: true,
    message: 'Vehicle updated successfully',
    data,
  });
});

export const VehicleController = {
  createVehicle,
  getVehicle,
  getVehicles,
  updateVehicle,
  availableVehicles,
};
