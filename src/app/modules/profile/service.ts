import { Profile } from '@prisma/client';
import prisma from '../../../constants/prisma';

const updateProfile = async (
  id: string,
  payload: Partial<Profile>,
): Promise<Profile> => {
  const profile = await prisma.profile.update({
    where: { id },
    data: payload,
  });

  return profile;
};

const getProfiles = async () => {
  const result = await prisma.profile.findMany({});

  return result;
};

const getProfile = async (userId: string) => {
  const result = await prisma.profile.findUnique({
    where: { userId },
    include: { user: true },
  });

  return result;
};

const deleteProfile = async (id: string) => {
  const result = await prisma.profile.delete({ where: { id } });

  return result;
};

export const ProfileService = {
  updateProfile,
  getProfiles,
  getProfile,
  deleteProfile,
};
