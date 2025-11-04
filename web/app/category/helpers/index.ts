import type { IDirectory } from '@/types';

export function collectUniqueItemToMap(
  map: Map<string, IDirectory>,
  item: IDirectory | undefined
): void {
  if (item?.$id) {
    map.set(item.$id, {
      $id: item.$id,
      name: item.name,
    });
  }
}
