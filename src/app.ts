import express, { Request, Response } from "express";
import cors from "cors";
import "express-async-errors";
import dotenv from "dotenv";
import { notFound } from "./middlewares/notFoundMiddleWare";
import { errorHandlerMiddleware } from "./middlewares/errorHandler";
import fileUpload from "express-fileupload";
dotenv.config();

// Routers
import { authRouter } from "./routes";
import { AppDataSource } from "./dataSource";

// Middlewares
const app = express();
const corsOptions = {
	origin: "*",
	credentials: true,
	optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ limit: "20mb", extended: true }));
app.use(
	fileUpload({
		useTempFiles: true,
		tempFileDir: "/tmp",
	})
);

// Routes
app.use("/api/v1/auth", authRouter);

const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
	res.send("Ts  BACKEND");
});

// Error handling middlewares
app.use(notFound);
app.use(errorHandlerMiddleware);
const start = async () => {
	await AppDataSource.initialize();
	app.listen(port, () => console.log(`App listening on port ${port}!`));
};

start();
