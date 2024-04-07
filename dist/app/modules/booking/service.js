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
exports.BookingService = void 0;
const prisma_1 = __importDefault(require("../../../constants/prisma"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const pagination_1 = require("../../../helpers/pagination");
const constants_1 = require("../vehicle/constants");
const constants_2 = require("./constants");
const utils_1 = require("./utils");
const createBooking = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const vehicle = yield prisma_1.default.vehicle.findUnique({
        where: { id: data.vehicleId },
    });
    if (!vehicle)
        throw new ApiError_1.default(400, 'Vehicle id mismatched!');
    if (vehicle.status !== 'Available')
        throw new ApiError_1.default(404, "The vehicle isn't available now!");
    // have to do some error handling via date and time
    data.bookingId = yield utils_1.BookingUtils.generateBookingId();
    const booking = yield prisma_1.default.booking.create({ data });
    if (!booking)
        throw new ApiError_1.default(400, 'Failed to create booking!');
    yield prisma_1.default.vehicle.update({
        where: { id: data.vehicleId },
        data: { status: 'In_A_Trip' },
    });
    return booking;
});
const getBooking = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const booking = yield prisma_1.default.booking.findUnique({
        where: { id },
        include: {
            user: {
                include: {
                    profile: true,
                },
            },
            vehicle: {
                include: {
                    driver: true,
                },
            },
        },
    });
    if (!booking)
        throw new ApiError_1.default(404, 'Booking not found!');
    return booking;
});
const getBookings = (_a, options) => __awaiter(void 0, void 0, void 0, function* () {
    var { searchTerm } = _a, filterData = __rest(_a, ["searchTerm"]);
    const pipeline = [];
    const { limit, page, skip } = (0, pagination_1.calculatePagination)(options);
    if (searchTerm) {
        pipeline.push({
            OR: constants_2.bookingSearchableFields.map(field => ({
                [field]: { contains: searchTerm, mode: 'insensitive' },
            })),
        });
    }
    if (Object.keys(filterData).length > 0) {
        pipeline.push({
            AND: Object.keys(filterData).map(key => {
                if (constants_2.bookingRelationalFields.includes(key)) {
                    return {
                        [constants_1.vehicleRelationalFieldsMapper[key]]: {
                            id: filterData[key],
                        },
                    };
                }
                else {
                    return { [key]: { equals: filterData[key] } };
                }
            }),
        });
    }
    const where = pipeline.length > 0 ? { AND: pipeline } : {};
    const total = yield prisma_1.default.booking.count({ where });
    const data = yield prisma_1.default.booking.findMany({
        include: { user: true, vehicle: true },
        where,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? { [options.sortBy]: options.sortOrder }
            : { createdAt: 'desc' },
    });
    return { meta: { total, page, limit }, data };
});
const updateBooking = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const booking = yield prisma_1.default.booking.update({
        where: { id },
        data: payload,
        include: { user: true, vehicle: true },
    });
    return booking;
});
const deleteBooking = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const booking = yield prisma_1.default.booking.delete({ where: { id } });
    if (!booking)
        throw new ApiError_1.default(400, 'Failed to delete booking!');
    return booking;
});
exports.BookingService = {
    createBooking,
    getBooking,
    getBookings,
    updateBooking,
    deleteBooking,
};
