"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleRoutes = void 0;
const client_1 = require("@prisma/client");
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const controller_1 = require("./controller");
const validation_1 = require("./validation");
const router = (0, express_1.Router)();
const { ADMIN, SUPER_ADMIN } = client_1.ERole;
const { ZCreateVehicle, ZUpdateVehicle } = validation_1.VehicleValidation;
const { createVehicle, getVehicle, getVehicles, updateVehicle, availableVehicles, getAllVehicles, } = controller_1.VehicleController;
router
    .post('/', (0, auth_1.default)(ADMIN, SUPER_ADMIN), (0, validateRequest_1.default)(ZCreateVehicle), createVehicle)
    .get('/available', availableVehicles)
    .get('/dashboard', getAllVehicles)
    .patch('/:id', (0, auth_1.default)(ADMIN, SUPER_ADMIN), (0, validateRequest_1.default)(ZUpdateVehicle), updateVehicle)
    .get('/', getVehicles)
    .get('/:id', getVehicle);
exports.VehicleRoutes = router;
