import { Rent } from '@prisma/client';
import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { RentService } from './service';

const createRent = catchAsync(async (req: Request, res: Response) => {
  const data = await RentService.createRent(req.body);

  sendResponse<Rent>(res, {
    statusCode: 201,
    success: true,
    message: 'Rent created successfully',
    data,
  });
});

const getRents = catchAsync(async (req: Request, res: Response) => {
  const data = await RentService.getRents();

  sendResponse<Rent[]>(res, {
    statusCode: 200,
    success: true,
    message: 'Rents retrieve successfully!',
    data,
  });
});

const getRent = catchAsync(async (req: Request, res: Response) => {
  const data = await RentService.getRent(req.params.id);

  sendResponse<Rent>(res, {
    statusCode: 200,
    success: true,
    message: 'Rent retrieve successfully!',
    data,
  });
});

const updateRent = catchAsync(async (req: Request, res: Response) => {
  const data = await RentService.updateRent(req.params.id, req.body);

  sendResponse<Rent>(res, {
    statusCode: 200,
    success: true,
    message: 'Rent updated successfully!',
    data,
  });
});

const deleteRent = catchAsync(async (req: Request, res: Response) => {
  const data = await RentService.deleteRent(req.params.id);

  sendResponse<Rent>(res, {
    statusCode: 200,
    success: true,
    message: 'Rent deleted successfully!',
    data,
  });
});

export const RentController = {
  createRent,
  getRents,
  getRent,
  updateRent,
  deleteRent,
};
