import { Request, Response } from "express";
import { registerUser } from "./user.service"

export const registerUserController = async (
    req: Request,
    res: Response
) => {
    const result = await registerUser(req.body);
    res.status(201).json({
        success: true,
        message: "User registered successfully.",
        data: result,
    });
};