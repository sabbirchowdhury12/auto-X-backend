"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingValidation = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const ZCreateBooking = zod_1.z.object({
    body: zod_1.z.object({
        pickUpDateTime: zod_1.z.string({
            required_error: 'Pick up date and time is required!',
        }),
        returnDateTime: zod_1.z.string({
            required_error: 'Return date and time is required!',
        }),
        pickUpLocation: zod_1.z.string({
            required_error: 'Pick up location is required!',
        }),
        dropOffLocation: zod_1.z.string({
            required_error: 'Drop off location is required!',
        }),
        pickUpTime: zod_1.z.string({
            required_error: 'Pick up time is required!',
        }),
        bookingStatus: zod_1.z
            .enum([...Object.keys(client_1.EBookingStatus)])
            .default(client_1.EBookingStatus.Pending)
            .optional(),
        paymentStatus: zod_1.z
            .enum([...Object.keys(client_1.EPaymentStatus)])
            .default(client_1.EPaymentStatus.Unpaid)
            .optional(),
        vehicleId: zod_1.z.string({ required_error: 'Vehicle id is required!' }),
        userId: zod_1.z.string({ required_error: 'User id is required!' }),
    }),
});
const ZUpdateBooking = zod_1.z.object({
    body: zod_1.z.object({
        pickUpDateTime: zod_1.z.string().optional(),
        returnDateTime: zod_1.z.string().optional(),
        pickUpLocation: zod_1.z.string().optional(),
        dropOffLocation: zod_1.z.string().optional(),
        bookingStatus: zod_1.z
            .enum([...Object.keys(client_1.EBookingStatus)])
            .optional(),
        paymentStatus: zod_1.z
            .enum([...Object.keys(client_1.EPaymentStatus)])
            .optional(),
        userId: zod_1.z.string().optional(),
        vehicleId: zod_1.z.string().optional(),
        promoId: zod_1.z.string().optional(),
    }),
});
exports.BookingValidation = { ZCreateBooking, ZUpdateBooking };
