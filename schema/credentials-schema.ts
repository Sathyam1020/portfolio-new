import { z } from 'zod';

// Define email and password validation schemas
export const emailSchema = z.string().email('Invalid email address');
export const passwordSchema = z
  .string()
  .min(6, 'Password should be at least 6 characters')
  .max(20, 'Password should not exceed 20 characters');
