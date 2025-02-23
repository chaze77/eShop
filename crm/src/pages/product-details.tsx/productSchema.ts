import { REQUIRED_FIELD } from '@/constants';
import { z } from 'zod';

export const SCHEMA = z.object({
  name: z.string().min(1, REQUIRED_FIELD),
  description: z.string().min(1, REQUIRED_FIELD).optional(),
  price: z.string().min(1, REQUIRED_FIELD),
  subCategories: z.array(z.string()).nonempty(REQUIRED_FIELD),

  attributes: z.array(
    z.object({
      $id: z.string(),
      quantity: z.number(),
      colors: z.array(z.string()).min(1, REQUIRED_FIELD), // ✅ Теперь это массив строк
      size: z.array(z.string()).min(1, REQUIRED_FIELD), // ✅ Теперь это массив строк
    })
  ),

  brands: z.string().min(1, REQUIRED_FIELD),

  tags: z.array(z.string()).optional(),
});
