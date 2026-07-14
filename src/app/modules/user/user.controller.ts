import { Request, Response } from "express";
import { getMe, loginUser, refreshToken, registerUser } from "./user.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { env } from "../../../config/env";


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
      secure: env.NODE_ENV === "production",
      sameSite:
        env.NODE_ENV === "production"
          ? "none"
          : "lax",
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

// get me controller
export const getMeController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await getMe(req.user.userId);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User profile retrieved successfully.",
      data: result,
    });
  }
);