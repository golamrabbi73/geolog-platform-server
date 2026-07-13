import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { createCoreSample } from "./coreSample.service";

export const createCoreSampleController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await createCoreSample(
      req.body,
      req.user.userId
    );

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Core sample created successfully.",
      data: result,
    });
  }
);