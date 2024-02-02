"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityTooLarge = exports.ForbiddenError = exports.BadRequestError = exports.NotFoundError = exports.UnauthenticatedError = exports.CustomAPIError = void 0;
const custom_api_1 = __importDefault(require("./custom-api"));
exports.CustomAPIError = custom_api_1.default;
const unauthenticatedt_1 = require("./unauthenticatedt");
Object.defineProperty(exports, "UnauthenticatedError", { enumerable: true, get: function () { return unauthenticatedt_1.UnauthenticatedError; } });
const not_found_1 = require("./not-found");
Object.defineProperty(exports, "NotFoundError", { enumerable: true, get: function () { return not_found_1.NotFoundError; } });
const bad_request_1 = require("./bad-request");
Object.defineProperty(exports, "BadRequestError", { enumerable: true, get: function () { return bad_request_1.BadRequestError; } });
const forbidden_1 = require("./forbidden");
Object.defineProperty(exports, "ForbiddenError", { enumerable: true, get: function () { return forbidden_1.ForbiddenError; } });
const large_entity_1 = require("./large-entity");
Object.defineProperty(exports, "EntityTooLarge", { enumerable: true, get: function () { return large_entity_1.EntityTooLarge; } });
