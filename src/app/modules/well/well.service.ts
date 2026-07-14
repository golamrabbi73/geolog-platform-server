import { IQuery } from "../../../shared/types/query";
import AppError from "../../errors/AppError";
import { WellModel } from "./well.model";
import { CreateWellInput } from "./well.validation";

// Create Well
export const createWell = async (
  payload: CreateWellInput,
  userId: string
) => {
  const existingWell = await WellModel.findOne({
    wellName: payload.wellName,
  });

  if (existingWell) {
    throw new AppError(409, "Well already exists.");
  }

  const well = await WellModel.create({
    ...payload,
    createdBy: userId,
  });

  return well;
};

// Get my wells
export const getMyWells = async (
  userId: string
) => {
  return await WellModel.find({
    createdBy: userId,
  }).sort({
    createdAt: -1,
  });
};

// Get all wells
export const getAllWells = async (
  userId: string,
  role: string,
  query: IQuery
) => {
  const isPrivileged =
    role === "admin" || role === "manager";

  const andConditions: any[] = [];

  if (!isPrivileged) {
    andConditions.push({
      createdBy: userId,
    });
  }

  if (query.searchTerm) {
    andConditions.push({
      $or: [
        {
          wellName: {
            $regex: query.searchTerm,
            $options: "i",
          },
        },
        {
          location: {
            $regex: query.searchTerm,
            $options: "i",
          },
        },
      ],
    });
  }

  if (query.status) {
    andConditions.push({
      status: query.status,
    });
  }

  const whereConditions =
    andConditions.length
      ? { $and: andConditions }
      : {};

  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * limit;

  const data = await WellModel.find(whereConditions)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total =
    await WellModel.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
    data,
  };
};

// Get Single Well
export const getWellById = async (
  id: string
) => {
  const well = await WellModel.findById(id);

  if (!well) {
    throw new AppError(404, "Well not found.");
  }

  return well;
};

// Find well
const getWellOrThrow = async (
  id: string
) => {
  const well = await WellModel.findById(id);

  if (!well) {
    throw new AppError(404, "Well not found.");
  }

  return well;
};

// Update well
export const updateWell = async (
  id: string,
  payload: Partial<CreateWellInput>,
  userId: string,
  role: string
) => {
  const well = await getWellOrThrow(id);

  const isOwner =
    well.createdBy.toString() === userId;

  const isPrivileged =
    role === "admin" || role === "manager";

  if (!isOwner && !isPrivileged) {
    throw new AppError(
      403,
      "You are not allowed to update this well."
    );
  }

  Object.assign(well, payload);

  await well.save();

  return well;
};

// Delete well
export const deleteWell = async (
  id: string,
  userId: string,
  role: string
) => {
  const well = await getWellOrThrow(id);

  const isOwner =
    well.createdBy.toString() === userId;

  const isPrivileged =
    role === "admin" || role === "manager";

  if (!isOwner && !isPrivileged) {
    throw new AppError(
      403,
      "You are not allowed to delete this well."
    );
  }

  await well.deleteOne();

  return well;
};