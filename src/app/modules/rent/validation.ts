import { z } from 'zod';

const ZCreateRent = z.object({
  body: z.object({
    downPayment: z.number().optional(),
    discount: z.number().optional(),
    startTime: z.string({ required_error: 'startTime required' }),
    endTime: z.string({ required_error: 'endTime required' }),
    overTime: z.string().optional(),
    damageCompensation: z.number().optional(),
    refund: z.number().optional(),
    totalCost: z.number({ required_error: 'total cost required' }),

    bookingId: z
      .string()
      .refine(id => id.length > 0, { message: 'Booking ID cannot be empty' }),
    driverId: z
      .string()
      .refine(id => id.length > 0, { message: 'Driver ID cannot be empty' }),
  }),
});

const ZUpdateRent = ZCreateRent.partial();
export const RentValidation = { ZCreateRent, ZUpdateRent };
