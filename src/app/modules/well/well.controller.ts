import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import {
  createWell,
  getMyWells,
  getAllWells,
  updateWell,
  deleteWell,
} from "./well.service";
import { IQuery } from "../../../shared/types/query";

export const createWellController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await createWell(
      req.body,
      req.user.userId
    );

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Well created successfully.",
      data: result,
    });
  }
);

// Get my well controller
export const getMyWellsController = catchAsync(
  async (req, res) => {
    const result = await getMyWells(
      req.user.userId
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Wells retrieved successfully.",
      data: result,
    });
  }
);

export const getAllWellsController = catchAsync(
  async (req, res) => {
    const query: IQuery = {};

    if (req.query.searchTerm) {
    query.searchTerm = req.query.searchTerm.toString();
    }

    if (req.query.status) {
    query.status = req.query.status.toString();
    }

    if (req.query.page) {
    query.page = req.query.page.toString();
    }

    if (req.query.limit) {
    query.limit = req.query.limit.toString();
    }

    const result = await getAllWells(
      req.user.userId,
      req.user.role,
      query
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Wells retrieved successfully.",
      meta: result.meta,
      data: result.data,
    });
  }
);

export const updateWellController = catchAsync(
  async (req, res) => {
    const result = await updateWell(
      req.params.id as string,
      req.body,
      req.user.userId,
      req.user.role
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Well updated successfully.",
      data: result,
    });
  }
);

export const deleteWellController = catchAsync(
  async (req, res) => {
    const result = await deleteWell(
      req.params.id as string,
      req.user.userId,
      req.user.role
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Well deleted successfully.",
      data: result,
    });
  }
);