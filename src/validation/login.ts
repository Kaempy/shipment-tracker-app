import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type loginType = z.infer<typeof loginSchema>;

export { loginSchema };
export type { loginType };
