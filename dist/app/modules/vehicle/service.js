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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleService = void 0;
const prisma_1 = __importDefault(require("../../../constants/prisma"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const pagination_1 = require("../../../helpers/pagination");
const constants_1 = require("./constants");
const utils_1 = require("./utils");
const createVehicle = (data) => __awaiter(void 0, void 0, void 0, function* () {
    data.vehicleId = yield utils_1.VehicleUtils.generateVehicleId(data.vehicleType);
    const vehicle = yield prisma_1.default.vehicle.create({ data });
    if (!vehicle)
        throw new ApiError_1.default(400, 'Failed to created vahicle!');
    return vehicle;
});
const getVehicle = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const vehicle = yield prisma_1.default.vehicle.findUnique({ where: { id } });
    if (!vehicle)
        throw new ApiError_1.default(404, 'Vehicle not found!');
    return vehicle;
});
const getVehicles = (_a, options) => __awaiter(void 0, void 0, void 0, function* () {
    var { searchTerm } = _a, filterData = __rest(_a, ["searchTerm"]);
    const pipeline = [];
    const { limit, page, skip } = (0, pagination_1.calculatePagination)(options);
    if (searchTerm) {
        pipeline.push({
            OR: constants_1.vehicleSearchableFields.map(field => ({
                [field]: { contains: searchTerm, mode: 'insensitive' },
            })),
        });
    }
    if (Object.keys(filterData).length > 0) {
        pipeline.push({
            AND: Object.keys(filterData).map(key => {
                if (constants_1.vehicleRelationalFields.includes(key)) {
                    return {
                        [constants_1.vehicleRelationalFieldsMapper[key]]: {
                            id: filterData[key],
                        },
                    };
                }
                else {
                    return {
                        [key]: { equals: filterData[key] },
                    };
                }
            }),
        });
    }
    const where = pipeline.length > 0 ? { AND: pipeline } : {};
    const total = yield prisma_1.default.vehicle.count({ where });
    const data = yield prisma_1.default.vehicle.findMany({
        include: { driver: true },
        where,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? { [options.sortBy]: options.sortOrder }
            : { createdAt: 'desc' },
    });
    return { meta: { total, page, limit }, data };
});
const getAllVehicles = () => __awaiter(void 0, void 0, void 0, function* () {
    const allVehicles = yield prisma_1.default.vehicle.findMany({});
    const totalVehicle = yield prisma_1.default.vehicle.count({});
    const availeVehicle = yield prisma_1.default.vehicle.count({
        where: { status: 'Available' },
    });
    const resreveVehicle = yield prisma_1.default.vehicle.count({
        where: { status: 'In_A_Trip' },
    });
    return { data: { totalVehicle, availeVehicle, resreveVehicle, allVehicles } };
});
const availableVehicles = () => __awaiter(void 0, void 0, void 0, function* () {
    const availableVehicles = yield prisma_1.default.vehicle.findMany({
        where: {
            status: 'Available',
        },
    });
    // Query all booked drivers for the provided date
    // const bookedVehicleIds = (
    //   await prisma.booking.findMany({
    //     where: {
    //       pickUpDateTime,
    //     },
    //     select: {
    //       vehicleId: true,
    //     },
    //   })
    // ).map(booking => booking.vehicleId);
    // // Query available drivers by excluding booked drivers
    // const availableVehicale = await prisma.vehicle.findMany({
    //   where: {
    //     id: {
    //       notIn: bookedVehicleIds,
    //     },
    //   },
    // });
    return availableVehicles;
});
const updateVehicle = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const vehicle = yield prisma_1.default.vehicle.update({
        where: { id },
        data: payload,
        include: { driver: true },
    });
    return vehicle;
});
const deleteVehicle = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const vehicle = yield prisma_1.default.vehicle.delete({ where: { id } });
    if (!vehicle)
        throw new ApiError_1.default(400, 'Failed to delete vehicle!');
    return vehicle;
});
exports.VehicleService = {
    createVehicle,
    getVehicle,
    getVehicles,
    updateVehicle,
    availableVehicles,
    deleteVehicle,
    getAllVehicles,
};
