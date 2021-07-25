import { IObject } from "../@types";
import { isArray, isFunction, isObject, isString } from "../utils";

type PickObject<O extends IObject, Keys extends keyof O> = Pick<O, Keys>;

export type PickFunction<O extends IObject, Keys extends keyof O> = (
  keyValue: O[Keys],
  key: Keys,
  value: O
) => boolean;

export function pick<O extends IObject, Keys extends keyof O>(
  value: O,
  keys: Keys | Keys[],
  pickFunction?: PickFunction<O, Keys>
): PickObject<O, Keys>;

export function pick<O extends IObject, Keys extends keyof O>(
  value: O,
  pickFunction?: PickFunction<O, Keys>
): Partial<O>;

export function pick<O extends IObject, Keys extends keyof O>(
  value: O,
  pickerOrKeys: Keys | Keys[] | PickFunction<O, Keys>,
  pickFunction?: PickFunction<O, Keys>
) {
  const picked: PickObject<O, Keys> | Partial<O> = {};
  let keys: Keys[] = [];
  let pickFn: PickFunction<O, Keys> | undefined = pickFunction;
  if (isFunction(pickerOrKeys)) {
    pickFn = pickerOrKeys as PickFunction<O, Keys>;
  }

  if (isString(pickerOrKeys)) {
    keys = [pickerOrKeys as Keys];
  }

  if (isArray(pickerOrKeys)) {
    keys = [...pickerOrKeys];
  }

  const keysValue = Object.keys(value);
  for (let index = 0; index < keysValue.length; index++) {
    const key = keysValue[index] as Keys;
    const keyValue = value[key];

    if (
      (keys.length === 0 || keys.indexOf(key) !== -1) &&
      (!pickFn || !isFunction(pickFn) || pickFn(keyValue, key, value))
    ) {
      picked[key] = keyValue;
    }
  }

  return picked;
}

export type PickBySchema<Origin extends IObject> = {
  [P in keyof Origin]?: Origin[P] extends object
    ? Origin[P] extends any[]
      ? boolean
      : PickBySchema<Origin[P]> | boolean
    : boolean;
};

export type PickBy<Origin, Schema> = Pick<
  Origin,
  {
    [Key in keyof Schema]-?: Key extends keyof Origin
      ? Schema[Key] extends Exclude<boolean, false>
        ? Key
        : never
      : never;
  }[keyof Schema]
>;

export function pickBy<O extends IObject, Schema extends PickBySchema<O>>(
  value: O,
  schema: Schema
): PickBy<O, Schema> {
  const picked = {} as any;
  for (const pickedKey in value) {
    if (
      Object.prototype.hasOwnProperty.call(schema, pickedKey) &&
      Object.prototype.hasOwnProperty.call(value, pickedKey)
    ) {
      const currentSchemaValue = schema[pickedKey];
      const currentValue = value[pickedKey];
      if (currentSchemaValue === true) {
        picked[pickedKey] = currentValue;
      }

      if (isObject(currentValue) && isObject(currentSchemaValue)) {
        picked[pickedKey] = pickBy(currentValue, currentSchemaValue as any);
      }
    }
  }

  return picked;
}
