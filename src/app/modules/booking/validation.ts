import { EBookingStatus, EPaymentStatus } from '@prisma/client';
import { z } from 'zod';

const ZCreateBooking = z.object({
  body: z.object({
    pickUpDateTime: z.string({
      required_error: 'Pick up date and time is required!',
    }),
    returnDateTime: z.string({
      required_error: 'Return date and time is required!',
    }),
    pickUpLocation: z.string({
      required_error: 'Pick up location is required!',
    }),
    dropOffLocation: z.string({
      required_error: 'Drop off location is required!',
    }),
    pickUpTime: z.string({
      required_error: 'Pick up time is required!',
    }),
    bookingStatus: z
      .enum([...Object.keys(EBookingStatus)] as [string, ...string[]])
      .default(EBookingStatus.Pending)
      .optional(),
    paymentStatus: z
      .enum([...Object.keys(EPaymentStatus)] as [string, ...string[]])
      .default(EPaymentStatus.Unpaid)
      .optional(),
    vehicleId: z.string({ required_error: 'Vehicle id is required!' }),
    userId: z.string({ required_error: 'User id is required!' }),
  }),
});

const ZUpdateBooking = z.object({
  body: z.object({
    pickUpDateTime: z.string().optional(),
    returnDateTime: z.string().optional(),
    pickUpLocation: z.string().optional(),
    dropOffLocation: z.string().optional(),
    bookingStatus: z
      .enum([...Object.keys(EBookingStatus)] as [string, ...string[]])
      .optional(),
    paymentStatus: z
      .enum([...Object.keys(EPaymentStatus)] as [string, ...string[]])
      .optional(),
    userId: z.string().optional(),
    vehicleId: z.string().optional(),
    promoId: z.string().optional(),
  }),
});

export const BookingValidation = { ZCreateBooking, ZUpdateBooking };
