import { Router } from "express";
import { registerUserController } from "./user.controller";
import validateRequest from "../../middleware/validateRequest";
import { registerUserSchema } from "./user.validation";

const userRouter = Router();
userRouter.post(
  "/register",
  validateRequest(registerUserSchema),
  registerUserController
);

export default userRouter;