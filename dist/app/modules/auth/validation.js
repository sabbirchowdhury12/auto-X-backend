"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const zod_1 = require("zod");
const ZLogin = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({ required_error: 'Email is required!' }).email(),
        password: zod_1.z.string({ required_error: 'Password is required!' }),
    }),
});
const ZRegister = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: 'name is required!' }),
        email: zod_1.z.string({ required_error: 'Email is required!' }).email(),
        password: zod_1.z.string({ required_error: 'Password is required!' }),
        address: zod_1.z.string().optional(),
        image: zod_1.z.string().optional(),
        contactNo: zod_1.z.string({ required_error: 'Contact number is required!' }),
    }),
});
const ZChangePassword = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({ required_error: 'Email is required!' }),
        oldPassword: zod_1.z.string({ required_error: 'Old password is required!' }),
        newPassword: zod_1.z.string({ required_error: 'New password is required!' }),
    }),
});
exports.AuthValidation = { ZLogin, ZRegister, ZChangePassword };
