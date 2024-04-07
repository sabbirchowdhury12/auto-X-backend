"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRoutes = void 0;
const client_1 = require("@prisma/client");
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const controller_1 = require("./controller");
const validation_1 = require("./validation");
const router = (0, express_1.Router)();
const { CUSTOMER, DRIVER, ADMIN, SUPER_ADMIN } = client_1.ERole;
const { ZCreateBooking, ZUpdateBooking } = validation_1.BookingValidation;
const { createBooking, getBooking, getBookings, updateBooking, deleteBooking } = controller_1.BookingController;
router
    .post('/', (0, auth_1.default)(CUSTOMER), (0, validateRequest_1.default)(ZCreateBooking), createBooking)
    .patch('/:id', (0, auth_1.default)(CUSTOMER, DRIVER, ADMIN, SUPER_ADMIN), (0, validateRequest_1.default)(ZUpdateBooking), updateBooking)
    .delete('/:id', (0, auth_1.default)(ADMIN, SUPER_ADMIN), deleteBooking)
    .get('/:id', (0, auth_1.default)(CUSTOMER, DRIVER, ADMIN, SUPER_ADMIN), getBooking)
    .get('/', (0, auth_1.default)(ADMIN, SUPER_ADMIN), getBookings);
exports.BookingRoutes = router;
