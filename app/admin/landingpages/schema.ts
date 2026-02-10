import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export const LandingPageSchema = z.object({
  heading: z.string().min(5, "Name must be at least 5 characters"),
  describe: z.string().min(10, "Name must be at least 10 characters"),
  imageLandpage: z
    .instanceof(File)
    .optional()
    .refine((file) => !file || file.size <= MAX_FILE_SIZE, {
      message: "Max file size is 5MB",
    })
    .refine((file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: "Only .jpg, .jpeg, .png formats are supported",
    })

});

export type LandingPageData = z.infer<typeof LandingPageSchema>;

// Edit LandingPage (partial update)
export const LandingPageEditSchema = LandingPageSchema.partial();
export type LandingPageEditData = z.infer<typeof LandingPageEditSchema>;
