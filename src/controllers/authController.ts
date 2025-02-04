import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { userRepo } from "../dataSource";

const register = async (req: Request, res: Response) => {
	const { firstName, lastName, age } = req.body;
	const user = await userRepo.create({ firstName, lastName, age });
	user.save();
	res.status(StatusCodes.OK).json({ msg: "Register user", user });
};

export { register };
