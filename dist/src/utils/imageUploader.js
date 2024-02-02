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
const cloudinary_1 = __importDefault(require("cloudinary"));
const cloudinary = cloudinary_1.default.v2;
const fs_1 = __importDefault(require("fs"));
const errors_1 = require("../errors");
const uploadImageFile = (req, key, resourceType) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // @ts-ignore
        const file = req.files[key];
        const maxSize = 1024 * 1024 * 5;
        if (!file) {
            throw new errors_1.BadRequestError(`Please upload a ${key}`);
        }
        //@ts-ignore
        if (file.size > maxSize) {
            throw new errors_1.EntityTooLarge("Max size of 5mb exceeded");
        }
        const uploadedFile = yield uploadToCloudinary(file, key, resourceType);
        // @ts-ignore
        if (file.tempFilePath) {
            // @ts-ignore
            fs_1.default.unlinkSync(file.tempFilePath);
        }
        return uploadedFile;
    }
    catch (error) {
        throw error;
    }
});
const uploadToCloudinary = (file, key, resourceType) => __awaiter(void 0, void 0, void 0, function* () {
    const { public_id, secure_url } = yield cloudinary.uploader.upload(file.tempFilePath, {
        //@ts-ignore
        resource_type: resourceType,
        use_filename: true,
        folder: key,
    });
    return { public_id, secure_url };
});
exports.default = uploadImageFile;
