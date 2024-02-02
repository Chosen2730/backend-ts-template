"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizePermissions = exports.authorize = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errors_1 = require("../errors");
const authorize = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new errors_1.UnauthenticatedError("Not authorized");
    }
    const token = authHeader.split(" ")[1];
    try {
        const payload = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        // @ts-ignore
        req.user = payload.user;
        next();
    }
    catch (error) {
        throw new errors_1.UnauthenticatedError("Authentication invalid");
    }
};
exports.authorize = authorize;
const authorizePermissions = (...roles) => (req, res, next) => {
    // @ts-ignore
    if (!req.user || !roles.includes(req.user.role)) {
        throw new errors_1.ForbiddenError("Access denied");
    }
    next();
};
exports.authorizePermissions = authorizePermissions;
