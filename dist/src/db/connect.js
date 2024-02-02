"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectDB = void 0;
const mongoose = require("mongoose");
const ConnectDB = (url) => {
    return mongoose.connect(url);
};
exports.ConnectDB = ConnectDB;
