import { EVehicleType } from '@prisma/client';
import prisma from '../../../constants/prisma';

const generateVehicleId = async (
  vehicleType: EVehicleType,
): Promise<string> => {
  const lastVehicle = await prisma.vehicle.findFirst({
    where: { vehicleType },
    orderBy: { createdAt: 'desc' },
  });

  const newId =
    (lastVehicle &&
      (Number(lastVehicle.vehicleId.split('-')) + 1)
        .toString()
        .padStart(5, '0')) ||
    '00001';

  return `${vehicleType}-${newId}`;
};

export const VehicleUtils = { generateVehicleId };
