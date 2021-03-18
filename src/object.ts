export const createEqualProperties = <V, T extends string>(
  value: V,
  ...properties: T[]
) => {
  const exportObject = {} as { [K in T]: V };
  properties.forEach((property: T) => {
    exportObject[property] = value;
  });

  return exportObject;
};

export const getPropertyByPath = <O extends { [key: string]: any }, R = unknown>(
  path: string,
  object: O
) => {
  let s = path;
  s = s.replace(/\[(\w+)\]/g, ".$1");
  s = s.replace(/^\./, "");
  const a = s.split(".");
  let pointer = object;
  for (let i = 0, n = a.length; i < n; i += 1) {
    const k = a[i];
    if (k in object) {
      pointer = pointer[k];
    } else {
      return;
    }
  }

  return (pointer as unknown) as R | undefined;
};
