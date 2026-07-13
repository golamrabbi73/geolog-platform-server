import { z } from "zod";
import { NextFunction, Request, Response } from "express";

const validateRequest =
  (schema: z.ZodType) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);

      next();
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        error,
      });
    }
  };

export default validateRequest;