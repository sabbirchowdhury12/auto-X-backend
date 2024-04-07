"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriverController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const service_1 = require("./service");
const createDriver = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield service_1.DriverService.createDriver(req.body);
    console.log(data);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: 'Driver created successfully',
        data,
    });
}));
const availableDrivers = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { date } = req.query; // Assuming the date is passed as a query parameter
    const data = yield service_1.DriverService.availableDrivers(date);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Available Drivers retrieve successfully!',
        data,
    });
}));
const getDrivers = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield service_1.DriverService.getDrivers();
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Drivers retrieve successfully!',
        data,
    });
}));
const getDriver = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield service_1.DriverService.getDriver(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Driver retrieve successfully!',
        data,
    });
}));
const updateDriver = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield service_1.DriverService.updateDriver(req.params.id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Driver updated successfully!',
        data,
    });
}));
const deleteDriver = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield service_1.DriverService.deleteDriver(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Driver Deleted successfully!',
        data,
    });
}));
exports.DriverController = {
    createDriver,
    availableDrivers,
    getDrivers,
    getDriver,
    updateDriver,
    deleteDriver,
};
