"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.createToken = void 0;
const config_1 = __importDefault(require("../config"));
const jsonwebtoken_1 = require("jsonwebtoken");
const ApiError_1 = __importDefault(require("../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const createToken = (payload, tokenType) => {
    if (tokenType === 'access') {
        return (0, jsonwebtoken_1.sign)(payload, config_1.default.jwt.secret, {
            expiresIn: config_1.default.jwt.expires_in,
        });
    }
    else {
        return (0, jsonwebtoken_1.sign)(payload, config_1.default.jwt.refresh_secret, {
            expiresIn: config_1.default.jwt.refresh_expires_in,
        });
    }
};
exports.createToken = createToken;
const verifyToken = (token, secret) => {
    try {
        return (0, jsonwebtoken_1.verify)(token, secret);
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Invalid token');
    }
};
exports.verifyToken = verifyToken;
