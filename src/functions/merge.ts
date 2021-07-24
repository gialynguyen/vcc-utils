import { IObject, TUnionToIntersection } from "../@types";
import { isObject } from "../utils";

export const merge = <T extends IObject[]>(
  ...objects: T
): TUnionToIntersection<T[number]> =>
  objects.reduce((result, current) => {
    const prevResultKey = Object.keys(result || {});
    const currentKey = Object.keys(current || {});
    const loopObject =
      prevResultKey.length > currentKey.length ? result : current;

    Object.keys(loopObject || {}).forEach((key) => {
      if (Array.isArray(result[key]) && Array.isArray(current[key])) {
        result[key] = Array.from(new Set(result[key].concat(current[key])));
      } else if (isObject(result[key]) && isObject(current[key])) {
        result[key] = merge(result[key], current[key]);
      } else {
        if (currentKey.indexOf(key) !== -1) {
          result[key] = current[key];
        } else {
          result[key] = loopObject[key];
        }
      }
    });

    return result;
  }, {}) as any;
