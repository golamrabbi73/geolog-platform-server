import { Schema, model } from "mongoose";
import { ICoreSample } from "./coreSample.interface";

const coreSampleSchema = new Schema<ICoreSample>(
  {
    sampleId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    wellName: {
      type: String,
      required: true,
      trim: true,
    },

    depthFrom: {
      type: Number,
      required: true,
    },

    depthTo: {
      type: Number,
      required: true,
    },

    rockType: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    imageUrl: {
      type: String,
      default: "",
    },

    collectedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const CoreSampleModel = model<ICoreSample>(
  "CoreSample",
  coreSampleSchema
);