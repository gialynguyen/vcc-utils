import { IObject } from "../@types";
import { isArray, isFunction, isNull, isString } from "../utils";

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
