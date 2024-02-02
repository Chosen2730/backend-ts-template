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
const mongoose_1 = require("mongoose");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserSchema = new mongoose_1.Schema({
    email: {
        type: String,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide a valid email",
        ],
        required: [true, "Email is required"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    confirmPassword: {
        type: String,
        required: [true, "Confirm Password is required"],
    },
    role: {
        type: String,
        enum: ["admin", "student", "lecturer"],
        default: "student",
    },
    profilePhoto: {
        url: String,
        imageId: String,
    },
    isTutor: {
        type: Boolean,
        default: false,
    },
});
UserSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.password === undefined || this.confirmPassword === undefined) {
            return;
        }
        const salt = yield bcryptjs_1.default.genSaltSync(10);
        //@ts-ignore
        const passHash = yield bcryptjs_1.default.hashSync(this.password, salt);
        //@ts-ignore
        const confirmPassHash = yield bcryptjs_1.default.hashSync(this.confirmPassword, salt);
        this.password = passHash;
        this.confirmPassword = confirmPassHash;
        next();
    });
});
UserSchema.methods.createJWT = function () {
    return jsonwebtoken_1.default.sign({
        user: { email: this.email, userId: this._id, role: this.role },
    }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
};
UserSchema.methods.comparePasswords = function (enteredPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        const isCorrect = yield bcryptjs_1.default.compare(enteredPassword, this.password);
        return isCorrect;
    });
};
exports.default = (0, mongoose_1.model)("User", UserSchema);
