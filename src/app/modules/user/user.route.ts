import { Router } from "express";
import { loginUserController, registerUserController } from "./user.controller";
import validateRequest from "../../middleware/validateRequest";
import { loginUserSchema, registerUserSchema } from "./user.validation";

const userRouter = Router();

// user register route
userRouter.post(
  "/register",
  validateRequest(registerUserSchema),
  registerUserController
);

// user login route
userRouter.post(
  "/login",
  validateRequest(loginUserSchema),
  loginUserController
);

export default userRouter;