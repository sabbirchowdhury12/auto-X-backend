import { Profile } from '@prisma/client';
import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ProfileService } from './service';

const updateProfile = catchAsync(async (req: Request, res: Response) => {
  const data = await ProfileService.updateProfile(req.params.id, req.body);

  sendResponse<Profile>(res, {
    statusCode: 200,
    success: true,
    message: 'Profile updated successfully!',
    data,
  });
});

const getProfiles = catchAsync(async (req: Request, res: Response) => {
  const data = await ProfileService.getProfiles();

  sendResponse<Profile[]>(res, {
    statusCode: 200,
    success: true,
    message: 'Profiles retrieved successfully!',
    data,
  });
});

const getProfile = catchAsync(async (req: Request, res: Response) => {
  const data = await ProfileService.getProfile(req.params.id);

  sendResponse<Profile>(res, {
    statusCode: 200,
    success: true,
    message: 'Profile retrieved successfully!',
    data,
  });
});

const deleteProfile = catchAsync(async (req: Request, res: Response) => {
  const data = await ProfileService.deleteProfile(req.params.id);

  sendResponse<Profile>(res, {
    statusCode: 200,
    success: true,
    message: 'Profile Deleted successfully!',
    data,
  });
});

export const ProfileController = {
  updateProfile,
  getProfiles,
  getProfile,
  deleteProfile,
};
