import { REQUIRED_FIELD } from '@/constants';
import { z } from 'zod';

export const SCHEMA = z.object({
  name: z.string().min(1, REQUIRED_FIELD),
  description: z.string().min(1, REQUIRED_FIELD).optional(),
  price: z.string().min(1, REQUIRED_FIELD),
  subCategories: z.string().optional(),

  attributes: z.array(
    z.object({
      $id: z.string().optional(),
      quantity: z.number(),
      colors: z.string().min(1, REQUIRED_FIELD), // ✅ Теперь это массив строк
      size: z.string().min(1, REQUIRED_FIELD), // ✅ Теперь это массив строк
    })
  ),

  brands: z.string().min(1, REQUIRED_FIELD),

  tags: z.array(z.string()).optional(),
});
