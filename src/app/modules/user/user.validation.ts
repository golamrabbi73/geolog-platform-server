import {z} from "zod";


// User Registration Schema
export const registerUserSchema = z.object({
    name: z
    .string()
    .min(3, "Name must be at least 3 characters."),
    
    email: z
    .email("Invalid email address."),
    
    password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/,
      "Password must contain uppercase, lowercase, number, and special character."),
    
    photoURL: z.union([
    z.url("Invalid photo URL."),
    z.literal(""),
        ]).optional(),
});

export type RegisterUserInput = z.infer<typeof registerUserSchema>;


// User Login Schema
export const loginUserSchema = z.object({
  email: z.email("Invalid email address."),

  password: z
    .string()
    .min(1, "Password is required."),
});

export type LoginUserInput = z.infer<typeof loginUserSchema>;