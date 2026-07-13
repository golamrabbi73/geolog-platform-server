import { z } from "zod";

export const createCoreSampleSchema = z.object({
  sampleId: z.string().min(1),

  wellName: z.string().min(1),

  depthFrom: z.number(),

  depthTo: z.number(),

  rockType: z.string().min(1),

  description: z.string().optional(),
});

export type CreateCoreSampleInput = z.infer<
  typeof createCoreSampleSchema
>;