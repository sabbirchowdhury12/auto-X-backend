import { EBookingStatus, EPaymentStatus, ERentType } from '@prisma/client';
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
    rentType: z.enum([...Object.keys(ERentType)] as [string, ...string[]], {
      required_error: 'Rent type is required!',
    }),
    bookingStatus: z
      .enum([...Object.keys(EBookingStatus)] as [string, ...string[]])
      .default(EBookingStatus.Pending)
      .optional(),
    paymentStatus: z
      .enum([...Object.keys(EPaymentStatus)] as [string, ...string[]])
      .default(EPaymentStatus.Unpaid)
      .optional(),
    driverId: z.string({ required_error: 'Driver id is required!' }),
    vehicleId: z.string({ required_error: 'Vehicle id is required!' }),
    userId: z.string({ required_error: 'User id is required!' }),
    promoId: z.string().optional(),
  }),
});

const ZUpdateBooking = z.object({
  body: z.object({
    pickUpDateTime: z.string().optional(),
    returnDateTime: z.string().optional(),
    pickUpLocation: z.string().optional(),
    dropOffLocation: z.string().optional(),
    rentType: z
      .enum([...Object.keys(ERentType)] as [string, ...string[]])
      .optional(),
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
