import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(2).max(70),
  cv: z.string().min(2).max(70),
  transmission: z.string().min(2).max(70),
  people: z.string().min(1),
  photo: z.string().min(2).max(100),
  engine: z.string().min(2).max(70),
  type: z.string().min(2).max(70),
  priceDay: z.string().min(2).max(70),
  isPublish: z.boolean(),
});
