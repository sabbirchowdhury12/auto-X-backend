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
exports.ProfileService = void 0;
const prisma_1 = __importDefault(require("../../../constants/prisma"));
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.findMany({
    // select: {
    //     email: true,
    //     name: true
    // }
    // include: {
    //   user: true,
    // },
    });
    return result;
});
const getUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.findUnique({
        where: { id },
        include: { profile: true },
    });
    return result;
});
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const usr = yield prisma_1.default.user.findUnique({
        where: { id },
        include: { profile: true },
    });
    console.log((_a = usr === null || usr === void 0 ? void 0 : usr.profile) === null || _a === void 0 ? void 0 : _a.id);
    if ((_b = usr === null || usr === void 0 ? void 0 : usr.profile) === null || _b === void 0 ? void 0 : _b.id) {
        const deletedProfile = yield prisma_1.default.profile.delete({
            where: { id: (_c = usr === null || usr === void 0 ? void 0 : usr.profile) === null || _c === void 0 ? void 0 : _c.id },
        });
        console.log(deletedProfile);
    }
    const result = yield prisma_1.default.user.delete({ where: { id } });
    return result;
});
exports.ProfileService = {
    getUser,
    getUsers,
    deleteUser,
};
