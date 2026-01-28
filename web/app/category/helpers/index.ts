type ItemUnique = {
  $id: string;
  name: string;
};

export function collectUniqueItemToMap(
  map: Map<string, ItemUnique>,
  item: ItemUnique | undefined,
): void {
  if (item?.$id) {
    map.set(item.$id, {
      $id: item.$id,
      name: item.name,
    });
  }
}
