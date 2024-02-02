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
exports.createToken = void 0;
const otp_generator_1 = __importDefault(require("otp-generator"));
const createToken = (count) => __awaiter(void 0, void 0, void 0, function* () {
    const newToken = yield otp_generator_1.default.generate(count, {
        upperCaseAlphabets: false,
        specialChars: false,
        lowerCaseAlphabets: true,
        digits: true,
    });
    return newToken;
});
exports.createToken = createToken;
