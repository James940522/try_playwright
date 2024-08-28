import * as z from 'zod';

export const urlSchema = z.object({
  url: z
    .string()
    .regex(/^https?:\/\/.+/, 'URL must start with http:// or https://')
    .url('Please enter a valid URL'),
});

export type URLFormType = z.infer<typeof urlSchema>;
