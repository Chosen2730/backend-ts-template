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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("express-async-errors");
const dotenv_1 = __importDefault(require("dotenv"));
const connect_1 = require("./src/db/connect");
const notFoundMiddleWare_1 = require("./src/middlewares/notFoundMiddleWare");
const errorHandler_1 = require("./src/middlewares/errorHandler");
const cloudinary_1 = __importDefault(require("cloudinary"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
dotenv_1.default.config();
cloudinary_1.default.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});
// Routers
const routes_1 = require("./src/routes");
// Middlewares
const app = (0, express_1.default)();
const corsOptions = {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200,
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ limit: "20mb", extended: true }));
app.use((0, express_fileupload_1.default)({
    useTempFiles: true,
    tempFileDir: "/tmp",
}));
// Routes
app.use("/api/v1/auth", routes_1.authRouter);
const port = process.env.PORT || 3000;
const mongoUrl = process.env.MONGO_URI;
app.get("/", (req, res) => {
    res.send("LMS BACKEND");
});
// Error handling middlewares
app.use(notFoundMiddleWare_1.notFound);
app.use(errorHandler_1.errorHandlerMiddleware);
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(url);
    yield (0, connect_1.ConnectDB)(mongoUrl);
    app.listen(port, () => console.log(`App listening on port ${port}!`));
});
start();
