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
exports.DriverService = void 0;
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
const client_1 = require("@prisma/client");
const prisma_1 = __importDefault(require("../../../constants/prisma"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const bcrypt_1 = require("../../../helpers/bcrypt");
const utils_1 = require("./utils");
const createDriver = (_a) => __awaiter(void 0, void 0, void 0, function* () {
    var { email, password, driverId, licenseNo, licenseExpire, nidNo, userId } = _a, profileData = __rest(_a, ["email", "password", "driverId", "licenseNo", "licenseExpire", "nidNo", "userId"]);
    driverId = yield utils_1.DriverUtils.generateDriverId();
    password = yield (0, bcrypt_1.hashPassword)(password);
    let result;
    yield prisma_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield tx.user.create({
            data: { email, password, role: client_1.ERole.DRIVER },
            select: { id: true, email: true, password: false },
        });
        userId = user.id;
        const driver = yield tx.driver.create({
            data: {
                driverId,
                licenseNo,
                licenseExpire,
                nidNo,
                userId,
            },
        });
        const profile = yield tx.profile.create({
            data: Object.assign({ userId }, profileData),
        });
        result = Object.assign(Object.assign(Object.assign({}, user), profile), driver);
    }));
    if (!result)
        throw new ApiError_1.default(400, 'Failed to create driver!');
    return result;
});
const availableDrivers = (date) => __awaiter(void 0, void 0, void 0, function* () {
    // Query all booked drivers for the provided date
    // const bookedDriverIds = (
    //   await prisma.booking.findMany({
    //     where: {
    //       pickUpDateTime: date,
    //     },
    //     select: {
    //       driverId: true,
    //     },
    //   })
    // ).map(booking => booking.driverId);
    // // Query available drivers by excluding booked drivers
    // const availableDrivers = await prisma.driver.findMany({
    //   where: {
    //     id: {
    //       notIn: bookedDriverIds,
    //     },
    //   },
    // });
    return null;
});
const getDrivers = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.driver.findMany({
        include: { user: true },
    });
    return result;
});
const getDriver = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.driver.findUnique({
        where: { id },
        include: { user: true },
    });
    return result;
});
const updateDriver = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    yield getDriver(id);
    const result = yield prisma_1.default.driver.update({
        where: { id },
        data: updateData,
    });
    return result;
});
const deleteDriver = (id) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c, _d;
    const driverData = yield prisma_1.default.driver.findUnique({
        where: { id },
        include: { user: true },
    });
    const usr = yield prisma_1.default.user.findUnique({
        where: { id: (_b = driverData === null || driverData === void 0 ? void 0 : driverData.user) === null || _b === void 0 ? void 0 : _b.id },
        include: { profile: true },
    });
    if ((_c = usr === null || usr === void 0 ? void 0 : usr.profile) === null || _c === void 0 ? void 0 : _c.id) {
        const deletedProfile = yield prisma_1.default.profile.delete({
            where: { id: (_d = usr === null || usr === void 0 ? void 0 : usr.profile) === null || _d === void 0 ? void 0 : _d.id },
        });
        console.log(deletedProfile);
    }
    const result = yield prisma_1.default.driver.delete({ where: { id } });
    const deletedUser = yield prisma_1.default.user.delete({ where: { id: usr === null || usr === void 0 ? void 0 : usr.id } });
    console.log(deletedUser);
    return result;
});
exports.DriverService = {
    createDriver,
    availableDrivers,
    getDrivers,
    getDriver,
    updateDriver,
    deleteDriver,
};
