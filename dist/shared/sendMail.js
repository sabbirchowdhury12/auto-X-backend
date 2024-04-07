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
exports.sendMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
function sendMail(recipient) {
    return __awaiter(this, void 0, void 0, function* () {
        const transport = nodemailer_1.default.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 465,
            auth: {
                user: process.env.USER_EMAIL,
                pass: process.env.USER_PASSWORD,
            },
        });
        const mailOptions = {
            from: `${process.env.USER_EMAIL}`,
            to: `${recipient}`,
            subject: `Message from  (${process.env.USER_EMAIL})`,
            html: `
<html>
<head><title></title></head>
<body>
<h1>Welcome to Autox</h1>
</body>

</html>
    
    `,
        };
        const sendMailPromise = () => new Promise((resolve, reject) => {
            transport.sendMail(mailOptions, function (err) {
                if (!err) {
                    resolve('Email sent');
                }
                else {
                    reject(err.message);
                }
            });
        });
        try {
            yield sendMailPromise();
            return 'Email sent Successfully';
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }
        catch (err) {
            return err === null || err === void 0 ? void 0 : err.message;
        }
    });
}
exports.sendMail = sendMail;
