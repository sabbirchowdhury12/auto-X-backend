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
exports.VehicleController = void 0;
const pagination_1 = __importDefault(require("../../../constants/pagination"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const constants_1 = require("./constants");
const service_1 = require("./service");
const createVehicle = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield service_1.VehicleService.createVehicle(req.body);
    console.log(data);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: 'Vehicle created successfully',
        data,
    });
}));
const getVehicle = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield service_1.VehicleService.getVehicle(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Vehicle retrieved successfully',
        data,
    });
}));
const availableVehicles = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const { pickUpDateTime } = req.query;
    // console.log(req.query, 'now');
    console.log('hi');
    const data = yield service_1.VehicleService.availableVehicles();
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'available Vehicles retrieve successfully!',
        data,
    });
}));
const getVehicles = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, constants_1.vehicleFilterableFields);
    const options = (0, pick_1.default)(req.query, pagination_1.default);
    const { meta, data } = yield service_1.VehicleService.getVehicles(filters, options);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Vehicles retrieved successfully',
        meta,
        data,
    });
}));
const getAllVehicles = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = yield service_1.VehicleService.getAllVehicles();
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Vehicles retrieved successfully',
        data,
    });
}));
const updateVehicle = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield service_1.VehicleService.updateVehicle(req.params.id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Vehicle updated successfully',
        data,
    });
}));
exports.VehicleController = {
    createVehicle,
    getVehicle,
    getVehicles,
    updateVehicle,
    availableVehicles,
    getAllVehicles,
};
