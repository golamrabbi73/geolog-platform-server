import { Request, Response } from "express";
import { loginUser, registerUser } from "./user.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";


// User Registraiton Controller
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

// User Login Controller
export const loginUserController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await loginUser(req.body);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User logged in successfully.",
      data: result,
    });
  }
);