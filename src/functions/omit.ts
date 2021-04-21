import { IObject } from "../@types";
import { isArray, isFunction, isNull, isString } from "../utils";

type OmitObject<O extends IObject, Keys extends keyof O> = Pick<
  O,
  Exclude<keyof O, Keys>
>;

export type FunctionFilter<O extends IObject, Keys extends keyof O> = (
  keyValue: O[Keys],
  key: Keys,
  value: O
) => boolean;

export function omit<O extends IObject, Keys extends keyof O>(
  value: O,
  keys: Keys | Keys[],
  filter?: FunctionFilter<O, Keys>
): OmitObject<O, Keys>;

export function omit<O extends IObject, Keys extends keyof O>(
  value: O,
  filter?: FunctionFilter<O, Keys>
): Partial<O>;

export function omit<O extends IObject, Keys extends keyof O>(
  value: O,
  filterOrKeys: Keys | Keys[] | FunctionFilter<O, Keys>,
  filter?: FunctionFilter<O, Keys>
) {
  const omitted: OmitObject<O, Keys> | Partial<O> = {};
  let keys: Keys[] = [];
  let filterFn: FunctionFilter<O, Keys> | undefined = filter;
  if (isFunction(filterOrKeys)) {
    filterFn = filterOrKeys as FunctionFilter<O, Keys>;
  }

  if (isString(filterOrKeys)) {
    keys = [filterOrKeys as Keys];
  }

  if (isArray(filterOrKeys)) {
    keys = [...filterOrKeys];
  }

  const keysValue = Object.keys(value);
  for (let index = 0; index < keysValue.length; index++) {
    const key = keysValue[index] as Keys;
    const keyValue = value[key];

    if (
      keys.indexOf(key) === -1 &&
      (!filterFn || !isFunction(filterFn) || !filterFn(keyValue, key, value))
    ) {
      omitted[key] = keyValue;
    }
  }

  return omitted;
}
