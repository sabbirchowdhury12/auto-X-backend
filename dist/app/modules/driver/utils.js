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
exports.DriverUtils = void 0;
const prisma_1 = __importDefault(require("../../../constants/prisma"));
const generateDriverId = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastDriver = yield prisma_1.default.driver.findFirst({
        orderBy: { createdAt: 'desc' },
    });
    const newId = (lastDriver &&
        (Number(lastDriver.driverId.split('-')[1]) + 1)
            .toString()
            .padStart(5, '0')) ||
        '00001';
    return `D-${newId}`;
});
exports.DriverUtils = { generateDriverId };
