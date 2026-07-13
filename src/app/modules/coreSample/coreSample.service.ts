import { IQuery } from "../../../shared/types/query";
import AppError from "../../errors/AppError";
import { CoreSampleModel } from "./coreSample.model";
import { CreateCoreSampleInput } from "./coreSample.validation";

export const createCoreSample = async (
  payload: CreateCoreSampleInput,
  userId: string
) => {
  const existingSample = await CoreSampleModel.findOne({
    sampleId: payload.sampleId,
  });

  if (existingSample) {
    throw new AppError(409, "Sample ID already exists.");
  }

  const sample = await CoreSampleModel.create({
    ...payload,
    collectedBy: userId,
  });

  return sample;
};

// get my core samples
export const getMyCoreSamples = async (
  userId: string
) => {
  return await CoreSampleModel.find({
    collectedBy: userId,
  }).sort({
    createdAt: -1,
  });
};

// get all core samples (role based + search + filter + pagination)
export const getAllCoreSamples = async (
  userId: string,
  role: string,
  query: IQuery
) => {
  const isPrivileged = role === "admin" || role === "manager";

  const andConditions: any[] = [];

  // role-based visibility
  if (!isPrivileged) {
    andConditions.push({ collectedBy: userId });
  }

  // search (sampleId or wellName partial match)
  if (query.searchTerm) {
    andConditions.push({
      $or: [
        { sampleId: { $regex: query.searchTerm, $options: "i" } },
        { wellName: { $regex: query.searchTerm, $options: "i" } },
      ],
    });
  }

  // filter (exact match)
  if (query.rockType) {
    andConditions.push({ rockType: query.rockType });
  }

  if (query.wellName) {
    andConditions.push({ wellName: query.wellName });
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  // pagination
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * limit;

  const result = await CoreSampleModel.find(whereConditions)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await CoreSampleModel.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
    data: result,
  };
};

// get single core sample (internal helper — update/delete e use hobe)
const getCoreSampleOrThrow = async (id: string) => {
  const sample = await CoreSampleModel.findById(id);

  if (!sample) {
    throw new AppError(404, "Core sample not found.");
  }

  return sample;
};

// update core sample
export const updateCoreSample = async (
  id: string,
  payload: Partial<CreateCoreSampleInput>,
  userId: string,
  role: string
) => {
  const sample = await getCoreSampleOrThrow(id);

  const isOwner = sample.collectedBy.toString() === userId;
  const isPrivileged = role === "admin" || role === "manager";

  if (!isOwner && !isPrivileged) {
    throw new AppError(
      403,
      "You are not allowed to update this sample."
    );
  }

  Object.assign(sample, payload);
  await sample.save();

  return sample;
};

// delete core sample
export const deleteCoreSample = async (
  id: string,
  userId: string,
  role: string
) => {
  const sample = await getCoreSampleOrThrow(id);

  const isOwner = sample.collectedBy.toString() === userId;
  const isPrivileged = role === "admin" || role === "manager";

  if (!isOwner && !isPrivileged) {
    throw new AppError(
      403,
      "You are not allowed to delete this sample."
    );
  }

  await sample.deleteOne();

  return sample;
};