import { z } from "zod";

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

const MAX_FILE_SIZE = 2000000; // 2 MB

export const airplaneFormSchema = z.object({
  name: z
    .string({ required_error: "Aircraft name cannot be empty" })
    .min(4, { message: "Aircraft name must be at least 4 characters long" }),
  code: z
    .string({ required_error: "Flight code cannot be empty" }), // Hapus batasan minimum panjang flight code
  image: z
    .any()
    .refine(
      (file: File) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Image must be in jpg, jpeg, or png format"
    )
    .refine(
      (file: File) => file.size <= MAX_FILE_SIZE,
      "Image must be at least 2MB in size"
    ),
});
