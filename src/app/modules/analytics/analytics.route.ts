import { Router } from "express";
import auth from "../../middleware/auth";
import { getDashboardAnalyticsController } from "./analytics.controller";

const analyticsRouter = Router();

analyticsRouter.get(
  "/dashboard",
  auth("manager", "admin"),
  getDashboardAnalyticsController
);

export default analyticsRouter;