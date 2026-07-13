import { Types } from "mongoose";

export interface IWell {
  wellName: string;
  location: string;
  operator: string;
  depth: number;
  status: "planned" | "active" | "completed";
  description?: string;
  createdBy: Types.ObjectId;
}