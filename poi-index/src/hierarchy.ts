interface HasId {
  id: number | string;
}

export function nestHierarchy<T extends HasId>(
  items: T[],
  keys: (keyof T)[],
): Record<string, any> {
  const result: Record<string, any> = {};

  for (const item of items) {
    let currentLevel = result;

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const value = item[key];

      if (!value) continue;

      const valueStr = String(value);

      if (i === keys.length - 1) {
        if (!Array.isArray(currentLevel[valueStr])) {
          currentLevel[valueStr] = [];
        }

        currentLevel[valueStr].push(item.id);
      } else {
        if (
          typeof currentLevel[valueStr] !== 'object' ||
          Array.isArray(currentLevel[valueStr])
        ) {
          currentLevel[valueStr] = {};
        }

        currentLevel = currentLevel[valueStr];
      }
    }
  }

  return result;
}
