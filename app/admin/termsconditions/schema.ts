import { z } from "zod";

export const TermsConditionSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(10, "Message must be at least 10 characters")



});

export type TermsConditionData = z.infer<typeof TermsConditionSchema>;

// Edit TermsCondition
export const TermsConditionEditSchema = TermsConditionSchema.partial();
export type TermsConditionEditData = z.infer<typeof TermsConditionEditSchema>;
