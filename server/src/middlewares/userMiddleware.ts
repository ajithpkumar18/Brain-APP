import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
	throw new Error(
		"JWT_SECRET is not set. Add it to your .env file. middleware",
	);
}

export const userMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const token = req.cookies.token;
	console.log("token", token);
	if (!token) {
		res.status(403).json({
			message: "No token provided",
		});
		return;
	}
	try {
		const decoded = jwt.verify(token as string, JWT_SECRET) as {
			id: string;
		};

		console.log("decoded id", decoded.id);
		//@ts-ignore
		req.userId = decoded.id;
		next();
	} catch (e) {
		res.status(403).json({
			message: "You are not logged in",
		});
		return;
	}
};
