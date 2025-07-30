import { z } from 'zod/v4';

export const textEditor_20250429InputSchema = z.object({
  command: z.enum(['str_replace_editor', 'view', 'create', 'str_replace', 'insert', 'undo_edit']),
  path: z.string(),
  file_text: z.string().optional(),
  insert_line: z.number().int().optional(),
  new_str: z.string().optional(),
  old_str: z.string().optional(),
  view_range: z.array(z.number().int()).optional(),
});