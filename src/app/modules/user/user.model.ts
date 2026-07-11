import { Schema, model } from "mongoose";
import { User } from "./user.interface";
import { USER_ROLES, USER_STATUSES } from "../../../shared/types/common";

const userSchema = new Schema<User>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    photoURL: {
      type: String,
      default: "",
    },

    role: {
      type: String,
      enum: USER_ROLES,
      default: "fieldEngineer",
    },

    status: {
      type: String,
      enum: USER_STATUSES,
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

export const UserModel = model<User>("User", userSchema);