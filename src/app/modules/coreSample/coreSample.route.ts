import { Router } from "express";
import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import { createCoreSampleController, getMyCoreSamplesController } from "./coreSample.controller";
import { createCoreSampleSchema } from "./coreSample.validation";

const coreSampleRouter = Router();

coreSampleRouter.post(
  "/",
  auth("fieldEngineer", "manager", "admin"),
  validateRequest(createCoreSampleSchema),
  createCoreSampleController
);

// get my sample route
coreSampleRouter.get(
  "/my-samples",
  auth(
    "fieldEngineer",
    "manager",
    "admin"
  ),
  getMyCoreSamplesController
);

export default coreSampleRouter;