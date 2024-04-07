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
exports.AuthService = void 0;
const prisma_1 = __importDefault(require("../../../constants/prisma"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const bcrypt_1 = require("../../../helpers/bcrypt");
const jwt_1 = require("../../../helpers/jwt");
const constant_1 = require("./constant");
const { select } = constant_1.AuthConstant;
const login = ({ email, password }) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.user.findUnique({ where: { email } });
    if (!user)
        throw new ApiError_1.default(404, "User doesn't exist!");
    const isPasswordMatched = yield (0, bcrypt_1.matchPassword)(password, user.password);
    if (!isPasswordMatched)
        throw new ApiError_1.default(401, 'Password is incorrect!');
    const { id, role } = user;
    const accessToken = (0, jwt_1.createToken)({ id, role }, 'access');
    const refreshToken = (0, jwt_1.createToken)({ id, role }, 'refresh');
    return { accessToken, refreshToken };
});
const register = (_a) => __awaiter(void 0, void 0, void 0, function* () {
    var { email, password } = _a, others = __rest(_a, ["email", "password"]);
    const isExist = yield prisma_1.default.user.findUnique({ where: { email } });
    if (isExist)
        throw new ApiError_1.default(409, 'The user is already exist!');
    password = yield (0, bcrypt_1.hashPassword)(password);
    let profile, user;
    yield prisma_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        user = yield tx.user.create({ data: { email, password }, select });
        profile = yield tx.profile.create({ data: Object.assign({ userId: user.id }, others) });
    }));
    if (!profile || !user)
        throw new ApiError_1.default(400, 'Failed to create user!');
    const { id, role } = user;
    const accessToken = (0, jwt_1.createToken)({ id, role }, 'access');
    const refreshToken = (0, jwt_1.createToken)({ id, role }, 'refresh');
    return { accessToken, refreshToken, user };
});
const changePassword = ({ email, oldPassword, newPassword, }) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.user.findUnique({ where: { email } });
    if (!user)
        throw new ApiError_1.default(404, 'User not found!');
    const isPasswordMatched = yield (0, bcrypt_1.matchPassword)(oldPassword, user === null || user === void 0 ? void 0 : user.password);
    if (!isPasswordMatched)
        throw new ApiError_1.default(401, 'Password not matched!');
    newPassword = yield (0, bcrypt_1.hashPassword)(newPassword);
    yield prisma_1.default.user.update({
        where: { email },
        data: { password: newPassword },
    });
});
exports.AuthService = { login, register, changePassword };
