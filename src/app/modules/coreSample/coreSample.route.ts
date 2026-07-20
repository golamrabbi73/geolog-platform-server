import { Router } from "express";
import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import {
  createCoreSampleController,
  getMyCoreSamplesController,
  getAllCoreSamplesController,
  getPublicCoreSamplesController,
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

// get all samples (public explore listing - no auth required)
coreSampleRouter.get(
  "/public",
  getPublicCoreSamplesController
);

// get all samples (role based)
coreSampleRouter.get(
  "/",
  auth("fieldEngineer", "manager", "admin"),
  getAllCoreSamplesController
);

// Get Single Core Sample (public - details page must be publicly accessible)
coreSampleRouter.get(
  "/:id",
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