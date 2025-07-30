import z from 'zod/v4';

export const bash_20241022InputSchema = z.object({
  command: z.string(),
  restart: z.boolean().optional(),
});
