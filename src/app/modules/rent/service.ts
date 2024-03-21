import { Rent } from '@prisma/client';
import httpStatus from 'http-status';
import prisma from '../../../constants/prisma';
import ApiError from '../../../errors/ApiError';

const createRent = async (rentData: Rent): Promise<Rent> => {
  const result = await prisma.rent.create({
    data: rentData,
  });
  return result;
};

const getRents = async () => {
  const result = await prisma.rent.findMany({});
  return result;
};

const getRent = async (id: string) => {
  const result = await prisma.rent.findUnique({
    where: {
      id,
    },
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Rent Id not found');
  }
  return result;
};

const updateRent = async (
  id: string,
  updateData: Partial<Rent>,
): Promise<Rent> => {
  await getRent(id);
  const result = await prisma.rent.update({
    where: {
      id,
    },
    data: updateData,
  });
  return result;
};

const deleteRent = async (id: string): Promise<Rent> => {
  await getRent(id);
  const result = await prisma.rent.delete({
    where: {
      id,
    },
  });
  return result;
};

export const RentService = {
  createRent,
  getRents,
  getRent,
  updateRent,
  deleteRent,
};
