"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const ZProfileUpdate = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        gender: zod_1.z
            .enum([...Object.keys(client_1.EGender)])
            .optional(),
        address: zod_1.z.string().optional(),
        image: zod_1.z.string().optional(),
        contactNo: zod_1.z.string().optional(),
        emergContact: zod_1.z.string().optional(),
        dateOfBirth: zod_1.z.string().optional(),
    }),
});
exports.AuthValidation = { ZProfileUpdate };
