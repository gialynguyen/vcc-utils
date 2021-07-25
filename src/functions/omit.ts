import { IObject } from "../@types";
import { isArray, isFunction, isObject, isString } from "../utils";

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

export type OmitBySchema<Origin extends IObject> = {
  [P in keyof Origin]?: Origin[P] extends IObject
    ? Origin[P] extends any[]
      ? boolean
      : OmitBySchema<Origin[P]> | boolean
    : boolean;
};

export type OmitBy<Origin, Schema> = Omit<
  Origin,
  {
    [Key in keyof Schema]-?: Key extends keyof Origin
      ? Schema[Key] extends Exclude<boolean, false>
        ? Key
        : never
      : never;
  }[keyof Schema]
>;

export function omitBy<O extends IObject, Schema extends OmitBySchema<O>>(
  value: O,
  schema: Schema
): OmitBy<O, Schema> {
  const picked = {} as any;
  for (const pickedKey in value) {
    const currentValue = value[pickedKey];

    if (
      Object.prototype.hasOwnProperty.call(schema, pickedKey) &&
      Object.prototype.hasOwnProperty.call(value, pickedKey)
    ) {
      const currentSchemaValue = schema[pickedKey];
      if (currentSchemaValue !== true) {
        picked[pickedKey] = currentValue;
      }

      if (isObject(currentValue) && isObject(currentSchemaValue)) {
        picked[pickedKey] = omitBy(currentValue, currentSchemaValue as any);
      }
    } else {
      picked[pickedKey] = currentValue;
    }
  }

  return picked;
}
