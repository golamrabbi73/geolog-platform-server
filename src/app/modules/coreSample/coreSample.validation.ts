import { z } from "zod";

export const createCoreSampleSchema = z.object({
  sampleId: z.string().min(1),

  wellName: z.string().min(1),

  depthFrom: z.number(),

  depthTo: z.number(),

  rockType: z.string().min(1),

  description: z.string().optional(),

  imageUrl: z
    .string()
    .url("Image URL must be a valid URL.")
    .optional()
    .or(z.literal("")),
});

export type CreateCoreSampleInput = z.infer<
  typeof createCoreSampleSchema
>;

export const updateCoreSampleSchema = createCoreSampleSchema.partial();

export type UpdateCoreSampleInput = z.infer<
  typeof updateCoreSampleSchema
>;