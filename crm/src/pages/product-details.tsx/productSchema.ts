import { REQUIRED_FIELD } from '@/constants';
import { z } from 'zod';
export const SCHEMA = z.object({
  $id: z.string().optional(),
  name: z.string().min(1, REQUIRED_FIELD),
  desc: z.string().min(1, REQUIRED_FIELD).optional(),
  price: z.string().min(1, REQUIRED_FIELD),
  subCategories: z.string().optional(),
  attributes: z.array(
    z.object({
      $id: z.string().optional(),
      quantity: z.number().optional(),
      colors: z.string().optional(),
      size: z.string().optional(),
    })
  ),
  brands: z.string().min(1, REQUIRED_FIELD),
  tags: z.array(z.string()).optional(),
  image: z.union([z.string(), z.instanceof(File)]).optional(),
});
