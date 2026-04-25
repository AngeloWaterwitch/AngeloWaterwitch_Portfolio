import { z } from 'zod';

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name is too long'),
  email: z
    .string()
    .email('Please enter a valid email address'),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message is too long'),
});

export const testimonialSchema = z.object({
  author: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name is too long'),
  role: z
    .string()
    .max(100, 'Role is too long')
    .optional(),
  quote: z
    .string()
    .min(10, 'Testimonial must be at least 10 characters')
    .max(500, 'Testimonial is too long — please keep it under 500 characters'),
});

export function validate(schema, data) {
  const result = schema.safeParse(data);
  if (result.success) return { valid: true, errors: {} };
  const errors = {};
  result.error.errors.forEach(err => {
    const field = err.path[0];
    if (field) errors[field] = err.message;
  });
  return { valid: false, errors };
}