"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const client_1 = require("@prisma/client");
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const controller_1 = require("./controller");
const validation_1 = require("./validation");
const router = (0, express_1.Router)();
const { CUSTOMER, DRIVER, ADMIN, SUPER_ADMIN } = client_1.ERole;
const { ZLogin, ZRegister, ZChangePassword } = validation_1.AuthValidation;
const { login, register, changePassword } = controller_1.AuthController;
router
    .post('/login', (0, validateRequest_1.default)(ZLogin), login)
    .post('/register', (0, validateRequest_1.default)(ZRegister), register)
    .patch('/change-password', (0, auth_1.default)(CUSTOMER, DRIVER, ADMIN, SUPER_ADMIN), (0, validateRequest_1.default)(ZChangePassword), changePassword);
exports.AuthRoutes = router;
