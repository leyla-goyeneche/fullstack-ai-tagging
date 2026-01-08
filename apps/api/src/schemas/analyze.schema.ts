import { z } from "zod";

export const AnalyzeResponseSchema = z.object({
  tags: z.array(z.string().min(1)).min(1),
  meta: z.object({
    filename: z.string().min(1),
    size: z.number().int().nonnegative(),
    mime: z.string().min(1),
  }),
});

export type AnalyzeResponse = z.infer<typeof AnalyzeResponseSchema>;
