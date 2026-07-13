import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { getDashboardAnalytics } from "./analytics.service";

export const getDashboardAnalyticsController =
  catchAsync(async (_req, res) => {
    const result = await getDashboardAnalytics();

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message:
        "Dashboard analytics retrieved successfully.",
      data: result,
    });
  });