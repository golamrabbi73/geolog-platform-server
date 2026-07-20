import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { createCoreSample, deleteCoreSample, getAllCoreSamples, getPublicCoreSamples, getCoreSampleById, getMyCoreSamples, updateCoreSample } from "./coreSample.service";
import { IQuery } from "../../../shared/types/query";

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

// get my core samples controller
export const getMyCoreSamplesController =
  catchAsync(async (req, res) => {
    const result = await getMyCoreSamples(
      req.user.userId
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message:
        "Core samples retrieved successfully.",
      data: result,
    });
  });

  // get all samples (role based) controller
export const getAllCoreSamplesController = catchAsync(
  async (req, res) => {
    const query: IQuery = {};

    if (req.query.searchTerm) {
      query.searchTerm = req.query.searchTerm.toString();
    }

    if (req.query.rockType) {
      query.rockType = req.query.rockType.toString();
    }

    if (req.query.wellName) {
      query.wellName = req.query.wellName.toString();
    }

    if (req.query.page) {
      query.page = req.query.page.toString();
    }

    if (req.query.limit) {
      query.limit = req.query.limit.toString();
    }

    const result = await getAllCoreSamples(
      req.user.userId,
      req.user.role,
      query
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Core samples retrieved successfully.",
      data: result.data,
      meta: result.meta,
    });
  }
);

// get all core samples (public, no auth) controller
export const getPublicCoreSamplesController = catchAsync(
  async (req, res) => {
    const query: IQuery = {};

    if (req.query.searchTerm) {
      query.searchTerm = req.query.searchTerm.toString();
    }

    if (req.query.rockType) {
      query.rockType = req.query.rockType.toString();
    }

    if (req.query.wellName) {
      query.wellName = req.query.wellName.toString();
    }

    if (req.query.page) {
      query.page = req.query.page.toString();
    }

    if (req.query.limit) {
      query.limit = req.query.limit.toString();
    }

    const result = await getPublicCoreSamples(query);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Core samples retrieved successfully.",
      data: result.data,
      meta: result.meta,
    });
  }
);

// update core sample controller
export const updateCoreSampleController = catchAsync(
  async (req, res) => {
    const result = await updateCoreSample(
      req.params.id as string,
      req.body,
      req.user.userId,
      req.user.role
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Core sample updated successfully.",
      data: result,
    });
  }
);

// delete core sample controller
export const deleteCoreSampleController = catchAsync(
  async (req, res) => {
    const result = await deleteCoreSample(
      req.params.id as string,
      req.user.userId,
      req.user.role
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Core sample deleted successfully.",
      data: result,
    });
  }
);

// get single core sample controller
export const getCoreSampleByIdController =
  catchAsync(async (req, res) => {
    const result = await getCoreSampleById(
      req.params.id as string
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message:
        "Core sample retrieved successfully.",
      data: result,
    });
  });