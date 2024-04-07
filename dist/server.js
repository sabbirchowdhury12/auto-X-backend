"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./config"));
const root = () => {
    try {
        const server = app_1.default.listen(config_1.default.port, () => console.log(`Server Running On http://localhost:${config_1.default.port}`));
        const exitHandler = () => {
            if (server)
                server.close(() => console.log('Server Closed!'));
            process.exit(1);
        };
        const unexpectedErrorHandler = (error) => {
            console.log('Error From Unexpected Error Handlar --> ', error);
            exitHandler();
        };
        process.on('uncaughtException', unexpectedErrorHandler);
        process.on('unhandledRejection', unexpectedErrorHandler);
        process.on('SIGTERM', () => {
            console.log('SIGTERM Received!');
            if (server)
                server.close();
        });
    }
    catch (err) {
        console.log('Error From Root --> ', err);
    }
};
root();
