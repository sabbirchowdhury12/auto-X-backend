"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthConstant = void 0;
const select = {
    id: true,
    email: true,
    password: false,
    role: true,
    createdAt: true,
    updatedAt: true,
};
exports.AuthConstant = { select };
