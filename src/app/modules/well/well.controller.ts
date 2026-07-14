import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import {
  createWell,
  getMyWells,
  getAllWells,
  updateWell,
  deleteWell,
  getWellById,
} from "./well.service";
import { IQuery } from "../../../shared/types/query";

interface WellParams {
  id: string;
}

// Create Well
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

// Get My Wells
export const getMyWellsController = catchAsync(
  async (req: Request, res: Response) => {
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

// Get All Wells
export const getAllWellsController = catchAsync(
  async (req: Request, res: Response) => {
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

// Get Single Well
export const getWellByIdController = catchAsync(
  async (req, res) => {
    const result = await getWellById(
      req.params.id as string
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Well retrieved successfully.",
      data: result,
    });
  }
);

// Update Well
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

// Delete Well
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