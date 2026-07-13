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