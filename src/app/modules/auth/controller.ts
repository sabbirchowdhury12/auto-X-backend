import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { AuthService } from './service';
import config from '../../../config';
import sendResponse from '../../../shared/sendResponse';
import { TLoginResponse, TRegisterResponse } from './interface';

const login = catchAsync(async (req: Request, res: Response) => {
  const { accessToken, refreshToken } = await AuthService.login(req.body);

  res.cookie('refreshToken', refreshToken, {
    secure: config.env === 'production',
    httpOnly: true,
  });

  sendResponse<Omit<TLoginResponse, 'refreshToken'>>(res, {
    statusCode: 200,
    success: true,
    message: 'User login successfully',
    data: { accessToken },
  });
});

const register = catchAsync(async (req: Request, res: Response) => {
  const { accessToken, refreshToken, user } = await AuthService.register(
    req.body,
  );

  res.cookie('refreshToken', refreshToken, {
    secure: config.env === 'production',
    httpOnly: true,
  });

  sendResponse<Omit<TRegisterResponse, 'refreshToken'>>(res, {
    statusCode: 200,
    success: true,
    message: 'User registered successfully!',
    data: { accessToken, user },
  });
});

const changePassword = catchAsync(async (req: Request, res: Response) => {
  await AuthService.changePassword(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Password updated successfully',
  });
});

export const AuthController = { login, register, changePassword };
