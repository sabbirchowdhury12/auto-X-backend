"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriverRoutes = void 0;
const client_1 = require("@prisma/client");
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const controller_1 = require("./controller");
const validation_1 = require("./validation");
const router = (0, express_1.Router)();
const { ADMIN, SUPER_ADMIN } = client_1.ERole;
const { ZCreateDriver } = validation_1.DriverValidation;
const { createDriver, getDrivers, getDriver, deleteDriver, updateDriver, availableDrivers, } = controller_1.DriverController;
router.post('/', (0, auth_1.default)(ADMIN, SUPER_ADMIN), (0, validateRequest_1.default)(ZCreateDriver), createDriver);
router.get('/', getDrivers);
router.get('/free-drivers', availableDrivers);
router.get('/:id', getDriver);
router.patch('/:id', updateDriver);
router.delete('/:id', deleteDriver);
exports.DriverRoutes = router;
