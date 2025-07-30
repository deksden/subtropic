import { z } from 'zod/v4';

export const computer_20250124InputSchema = z.object({
    action: z.enum([
      'key',
      'hold_key',
      'type',
      'cursor_position',
      'mouse_move',
      'left_mouse_down',
      'left_mouse_up',
      'left_click',
      'left_click_drag',
      'right_click',
      'middle_click',
      'double_click',
      'triple_click',
      'scroll',
      'wait',
      'screenshot',
    ]),
    coordinate: z.tuple([z.number().int(), z.number().int()]).optional(),
    duration: z.number().optional(),
    scroll_amount: z.number().optional(),
    scroll_direction: z.enum(['up', 'down', 'left', 'right']).optional(),
    start_coordinate: z.tuple([z.number().int(), z.number().int()]).optional(),
    text: z.string().optional(),
});
