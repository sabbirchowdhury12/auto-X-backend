import { User } from '@prisma/client';
import prisma from '../../../constants/prisma';
import ApiError from '../../../errors/ApiError';
import { hashPassword, matchPassword } from '../../../helpers/bcrypt';
import { createToken } from '../../../helpers/jwt';
import { AuthConstant } from './constant';
import {
  TChangePassword,
  TLoginResponse,
  TRegister,
  TRegisterResponse,
} from './interface';

const { select } = AuthConstant;

const login = async ({ email, password }: User): Promise<TLoginResponse> => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) throw new ApiError(404, "User doesn't exist!");

  const isPasswordMatched = await matchPassword(password, user.password);

  if (!isPasswordMatched) throw new ApiError(401, 'Password is incorrect!');

  const { id, role } = user;

  const accessToken = createToken({ id, role }, 'access');
  const refreshToken = createToken({ id, role }, 'refresh');

  return { accessToken, refreshToken };
};

const register = async ({
  email,
  password,
  ...others
}: TRegister): Promise<TRegisterResponse> => {
  const isExist = await prisma.user.findUnique({ where: { email } });

  if (isExist) throw new ApiError(409, 'The user is already exist!');

  password = await hashPassword(password);

  let profile, user;

  await prisma.$transaction(async tx => {
    user = await tx.user.create({ data: { email, password }, select });

    profile = await tx.profile.create({ data: { userId: user.id, ...others } });
  });

  if (!profile || !user) throw new ApiError(400, 'Failed to create user!');

  const { id, role } = user;

  const accessToken = createToken({ id, role }, 'access');
  const refreshToken = createToken({ id, role }, 'refresh');

  return { accessToken, refreshToken, user };
};

const changePassword = async ({
  email,
  oldPassword,
  newPassword,
}: TChangePassword) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) throw new ApiError(404, 'User not found!');

  const isPasswordMatched = await matchPassword(oldPassword, user?.password);

  if (!isPasswordMatched) throw new ApiError(401, 'Password not matched!');

  newPassword = await hashPassword(newPassword);

  await prisma.user.update({
    where: { email },
    data: { password: newPassword },
  });
};

export const AuthService = { login, register, changePassword };
