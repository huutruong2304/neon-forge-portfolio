import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(1, 'Name is required').min(2, 'Name must be at least 2 characters').max(100, 'Name must not exceed 100 characters'),
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address').max(100, 'Email must not exceed 100 characters'),
  subject: z.string().max(200, 'Subject must not exceed 200 characters').optional(),
  message: z
    .string()
    .min(1, 'Message is required')
    .min(10, 'Message must be at least 10 characters')
    .max(5000, 'Message must not exceed 5000 characters'),
  submittedAt: z.string().datetime('Invalid date format').optional(),
  source: z.string().url('Invalid URL').optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
