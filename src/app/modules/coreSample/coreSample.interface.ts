import { Types } from "mongoose";

export interface ICoreSample {
  sampleId: string;
  wellName: string;

  depthFrom: number;
  depthTo: number;

  rockType: string;

  description?: string;

  imageUrl?: string;
  collectedBy: Types.ObjectId;

  createdAt?: Date;
  updatedAt?: Date;
}