export interface IOFunction<I, O> {
  (input: I): O;
}

export interface IObject {
  [key: string]: any;
}

export type NotUndefined<T> = T extends undefined ? never : T;

export type DeepPartialWithValue<T, Value> = T extends Function
  ? Value
  : T extends object
  ? T extends unknown[]
    ? DeepPartialWithValue<T[number], Value>[]
    : { [P in keyof T]?: DeepPartialWithValue<T[P], Value> }
  : Value;

export type TUnionToIntersection<U> = (
  U extends any ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never;

export type Nullish = never | undefined | null | void;

export type ObjectWithoutNullishProperty<O extends IObject> = Pick<
  O,
  {
    [Key in keyof O]-?: Key extends keyof O
      ? O[Key] extends Nullish
        ? never
        : Key
      : never;
  }[keyof O]
>;

export type Primitive =
  | string
  | number
  | bigint
  | boolean
  | null
  | undefined
  | Symbol;
