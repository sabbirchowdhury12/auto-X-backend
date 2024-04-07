"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileRoutes = void 0;
const client_1 = require("@prisma/client");
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const controller_1 = require("./controller");
const validation_1 = require("./validation");
const router = (0, express_1.Router)();
const { CUSTOMER, DRIVER, ADMIN, SUPER_ADMIN } = client_1.ERole;
const { ZProfileUpdate } = validation_1.AuthValidation;
const { getProfile, getProfiles, deleteProfile, updateProfile } = controller_1.ProfileController;
router
    .patch('/:id', (0, auth_1.default)(CUSTOMER, DRIVER, ADMIN, SUPER_ADMIN), (0, validateRequest_1.default)(ZProfileUpdate), updateProfile)
    .delete('/:id', (0, auth_1.default)(CUSTOMER, DRIVER, ADMIN, SUPER_ADMIN), deleteProfile)
    .get('/:id', (0, auth_1.default)(CUSTOMER, DRIVER, ADMIN, SUPER_ADMIN), getProfile)
    .get('/', (0, auth_1.default)(ADMIN, SUPER_ADMIN), getProfiles);
exports.ProfileRoutes = router;
