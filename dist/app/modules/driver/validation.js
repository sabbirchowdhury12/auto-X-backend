"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriverValidation = exports.ZCreateDriver = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
// Define Zod schema for creating a driver
exports.ZCreateDriver = zod_1.z.object({
    body: zod_1.z
        .object({
        // User info
        email: zod_1.z.string({ required_error: 'Email is required!' }).email(),
        password: zod_1.z.string({ required_error: 'Password is required!' }),
        // profile info
        name: zod_1.z.string({ required_error: 'Name is required!' }),
        gender: zod_1.z.enum([...Object.keys(client_1.EGender)], {
            required_error: 'Gender is required!',
        }),
        address: zod_1.z.string().optional(),
        image: zod_1.z.string().optional(),
        contactNo: zod_1.z.string({ required_error: 'Contact number is required!' }),
        // driver info
        licenseNo: zod_1.z.string({ required_error: 'License number id is required!' }),
        licenseExpire: zod_1.z.string({
            required_error: 'License expire date is required!',
        }),
        nidNo: zod_1.z.string({ required_error: 'NID number is required!' }),
    })
        .strict(),
});
const ZUpdateDriver = exports.ZCreateDriver.partial();
exports.DriverValidation = { ZCreateDriver: exports.ZCreateDriver, ZUpdateDriver };
