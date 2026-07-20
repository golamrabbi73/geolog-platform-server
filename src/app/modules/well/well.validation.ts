import { z } from "zod";

export const createWellSchema = z.object({
  wellName: z.string().min(1, "Well name is required."),

  location: z.string().min(1, "Location is required."),

  operator: z.string().min(1, "Operator is required."),

  depth: z.number().min(0, "Depth must be greater than or equal to 0."),

  status: z.enum(["planned", "active", "completed"]).optional(),

  description: z.string().optional(),

  imageUrl: z
    .string()
    .url("Image URL must be a valid URL.")
    .optional()
    .or(z.literal("")),
});

export const updateWellSchema = createWellSchema.partial();

export type CreateWellInput = z.infer<typeof createWellSchema>;