import prisma from '../../../constants/prisma';

const generateBookingId = async (): Promise<string> => {
  const lastBooking = await prisma.booking.findFirst({
    orderBy: { createdAt: 'desc' },
  });

  const newId =
    (lastBooking &&
      (Number(lastBooking.bookingId.split('-')[1]) + 1)
        .toString()
        .padStart(5, '0')) ||
    '00001';

  return `B-${newId}`;

  // X${date.getDate().toString().padStart(2, '0')}${(
  //   date.getMonth() + 1
  // )
  //   .toString()
  //   .padStart(2, '0')}${date.getFullYear() % 100}`;
};

export const BookingUtils = { generateBookingId };
