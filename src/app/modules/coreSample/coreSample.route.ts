import { Router } from "express";
import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import { createCoreSampleController } from "./coreSample.controller";
import { createCoreSampleSchema } from "./coreSample.validation";

const coreSampleRouter = Router();

coreSampleRouter.post(
  "/",
  auth("fieldEngineer", "manager", "admin"),
  validateRequest(createCoreSampleSchema),
  createCoreSampleController
);

export default coreSampleRouter;