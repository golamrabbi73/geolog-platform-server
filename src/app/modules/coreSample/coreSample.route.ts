import { Router } from "express";
import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import {
  createCoreSampleController,
  getMyCoreSamplesController,
  getAllCoreSamplesController,
  updateCoreSampleController,
  deleteCoreSampleController,
  getCoreSampleByIdController,
} from "./coreSample.controller";
import {
  createCoreSampleSchema,
  updateCoreSampleSchema,
} from "./coreSample.validation";

const coreSampleRouter = Router();

coreSampleRouter.post(
  "/",
  auth("fieldEngineer", "manager", "admin"),
  validateRequest(createCoreSampleSchema),
  createCoreSampleController
);

// get my samples
coreSampleRouter.get(
  "/my-samples",
  auth("fieldEngineer", "manager", "admin"),
  getMyCoreSamplesController
);

// get all samples (role based)
coreSampleRouter.get(
  "/",
  auth("fieldEngineer", "manager", "admin"),
  getAllCoreSamplesController
);

// Get Single Core Sample
coreSampleRouter.get(
  "/:id",
  auth("fieldEngineer", "manager", "admin"),
  getCoreSampleByIdController
);

// update sample
coreSampleRouter.patch(
  "/:id",
  auth("fieldEngineer", "manager", "admin"),
  validateRequest(updateCoreSampleSchema),
  updateCoreSampleController
);

// delete sample
coreSampleRouter.delete(
  "/:id",
  auth("fieldEngineer", "manager", "admin"),
  deleteCoreSampleController
);

export default coreSampleRouter;