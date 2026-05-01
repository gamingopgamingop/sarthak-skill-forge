import { z } from 'zod';

export const RoleEnum = z.enum(['USER', 'ADMIN']);
export type Role = z.infer<typeof RoleEnum>;

export const UserSchema = z.object({
  id: z.string(),
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  role: RoleEnum,
});

export type User = z.infer<typeof UserSchema>;

export type SessionPayload = {
  userId: string;
  role: Role;
  expiresAt: Date;
};

export const LoginFormSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  password: z.string().min(1, { message: 'Password field must not be empty.' }),
});

export const SignupFormSchema = z.object({
  username: z.string().min(2, { message: 'Name must be at least 2 characters long.' }).trim(),
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  password: z
    .string()
    .min(8, { message: 'Be at least 8 characters long' })
    .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
    .regex(/[0-9]/, { message: 'Contain at least one number.' })
    .regex(/[^a-zA-Z0-9]/, { message: 'Contain at least one special character.' })
    .trim(),
});
