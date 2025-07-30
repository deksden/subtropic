import { z } from 'zod/v4';

export const computer_20241022InputSchema = z.object({
  action: z.enum([
    'key',
    'type',
    'mouse_move',
    'left_click',
    'left_click_drag',
    'right_click',
    'middle_click',
    'double_click',
    'screenshot',
    'cursor_position',
  ]),
  coordinate: z.array(z.number().int()).optional(),
  text: z.string().optional(),
});
