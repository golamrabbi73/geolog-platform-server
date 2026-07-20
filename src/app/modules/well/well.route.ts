import { Router } from "express";
import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import {
  createWellController,
  getMyWellsController,
  getAllWellsController,
  getPublicWellsController,
  updateWellController,
  deleteWellController,
  getWellByIdController,
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

// Get All Wells (public explore listing - no auth required)
wellRouter.get(
  "/public",
  getPublicWellsController
);

// Get All Wells (dashboard - role-based visibility)
wellRouter.get(
  "/",
  auth("manager", "admin"),
  getAllWellsController
);

// Get Single Well (public - details page must be publicly accessible)
wellRouter.get(
  "/:id",
  getWellByIdController
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