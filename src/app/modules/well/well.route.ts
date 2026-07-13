import { Router } from "express";
import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import {
  createWellController,
  getMyWellsController,
  getAllWellsController,
  updateWellController,
  deleteWellController,
} from "./well.controller";
import {
  createWellSchema,
  updateWellSchema,
} from "./well.validation";

const wellRouter = Router();

// Create Well
wellRouter.post(
  "/",
  auth("manager", "admin"),
  validateRequest(createWellSchema),
  createWellController
);

// Get My Wells
wellRouter.get(
  "/my-wells",
  auth("manager", "admin"),
  getMyWellsController
);

// Get All Wells
wellRouter.get(
  "/",
  auth("manager", "admin"),
  getAllWellsController
);

// Update Well
wellRouter.patch(
  "/:id",
  auth("manager", "admin"),
  validateRequest(updateWellSchema),
  updateWellController
);

// Delete Well
wellRouter.delete(
  "/:id",
  auth("manager", "admin"),
  deleteWellController
);

export default wellRouter;