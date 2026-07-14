import { NextFunction, Request, Response } from "express";
import AppError from "../errors/AppError";
import { verifyToken } from "../modules/auth/jwt";
import { env } from "../../config/env";
import catchAsync from "../utils/catchAsync";

const auth =
  (...requiredRoles: string[]) =>
  catchAsync(async (
    req: Request,
    _res: Response,
    next: NextFunction
  ) => {
    const authorizationToken = req.headers.authorization;

    if (!authorizationToken) {
      throw new AppError(401, "You are not authorized.");
    }

    const token = authorizationToken.split(" ")[1];

    if (!token) {
      throw new AppError(401, "Invalid authorization format.");
    }

    const decoded = verifyToken(
      token,
      env.JWT_ACCESS_SECRET
    );

    req.user = decoded;

    if (
      requiredRoles.length &&
      !requiredRoles.includes(decoded.role)
    ) {
      throw new AppError(
        403,
        "You are forbidden to access this resource."
      );
    }

    next();
  });

export default auth;