import { Router } from "express";
import { loginUserController, logoutController, refreshTokenController, registerUserController } from "./user.controller";
import validateRequest from "../../middleware/validateRequest";
import { loginUserSchema, registerUserSchema } from "./user.validation";
import auth from "../../middleware/auth";

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

// refresh token endpoint route
userRouter.post(
  "/refresh-token",
  refreshTokenController
);

// Logout route
userRouter.post(
  "/logout",
  logoutController
);


export default userRouter;