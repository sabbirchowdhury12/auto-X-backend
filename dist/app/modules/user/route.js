"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const client_1 = require("@prisma/client");
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const controller_1 = require("./controller");
const router = (0, express_1.Router)();
const { CUSTOMER, DRIVER, ADMIN, SUPER_ADMIN } = client_1.ERole;
const { getUsers, getUser, deleteUser } = controller_1.ProfileController;
router
    .delete('/:id', (0, auth_1.default)(CUSTOMER, DRIVER, ADMIN, SUPER_ADMIN), deleteUser)
    .get('/:id', (0, auth_1.default)(CUSTOMER, DRIVER, ADMIN, SUPER_ADMIN), getUser)
    .get('/', (0, auth_1.default)(ADMIN, SUPER_ADMIN), getUsers);
exports.UserRoutes = router;
