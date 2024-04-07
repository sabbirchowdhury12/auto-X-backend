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
const updateProfile = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const profile = yield prisma_1.default.profile.update({
        where: { userId: id },
        data: payload,
    });
    return profile;
});
const getProfiles = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.profile.findMany({});
    return result;
});
const getProfile = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.profile.findUnique({
        where: { userId },
        include: { user: true },
    });
    return result;
});
const deleteProfile = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.profile.delete({ where: { id } });
    return result;
});
exports.ProfileService = {
    updateProfile,
    getProfiles,
    getProfile,
    deleteProfile,
};
