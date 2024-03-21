import prisma from '../../../constants/prisma';

const generateDriverId = async (): Promise<string> => {
  const lastDriver = await prisma.driver.findFirst({
    orderBy: { createdAt: 'desc' },
  });

  const newId =
    (lastDriver &&
      (Number(lastDriver.driverId.split('-')[1]) + 1)
        .toString()
        .padStart(5, '0')) ||
    '00001';

  return `D-${newId}`;
};

export const DriverUtils = { generateDriverId };
