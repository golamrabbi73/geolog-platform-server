import { Schema, model } from "mongoose";
import { IWell } from "./well.interface";

const wellSchema = new Schema<IWell>(
  {
    wellName: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    operator: {
      type: String,
      required: true,
      trim: true,
    },

    depth: {
      type: Number,
      required: true,
      min: 0,
    },

    status: {
      type: String,
      enum: ["planned", "active", "completed"],
      default: "planned",
    },

    description: {
      type: String,
      default: "",
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const WellModel = model<IWell>(
  "Well",
  wellSchema
);