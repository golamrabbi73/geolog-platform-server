import { Request, Response } from "express";
import { loginUser, refreshToken, registerUser } from "./user.service";
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

    const { refreshToken, ...responseData } = result;

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
    });

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User logged in successfully.",
      data: responseData,
    });
  }
);

// Refresh token controller
export const refreshTokenController = catchAsync(
  async (req: Request, res: Response) => {
    const token = req.cookies.refreshToken;

    const result = await refreshToken(token);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Access token generated successfully.",
      data: result,
    });
  }
);

// Logout controller
export const logoutController = catchAsync(
  async (_req: Request, res: Response) => {
    res.clearCookie("refreshToken");

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Logged out successfully.",
      data: null,
    });
  }
);