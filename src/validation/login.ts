import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('Invalid email address').trim(),
  password: z.string().min(6, 'Password must be at least 6 characters').trim(),
});

type loginType = z.infer<typeof loginSchema>;

export { loginSchema };
export type { loginType };
