import { Request, Response } from "express";


import { registerUser } from "./user.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

export const registerUserController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await registerUser(req.body);

    sendResponse(res, {
  statusCode: 201,
  success: true,
  message: "User registered successfully.",
  data: result,
});
  }
);