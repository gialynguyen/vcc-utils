import { IOFunction } from "../@types/index";

export function pipe<I>(input: I): I;
export function pipe<I, A>(fn1: IOFunction<I, A>): IOFunction<I, A>;
export function pipe<I, A, B>(
  fn1: IOFunction<I, A>,
  fn2: IOFunction<A, B>
): IOFunction<I, B>;
export function pipe<I, A, B, C>(
  fn1: IOFunction<I, A>,
  fn2: IOFunction<A, B>,
  fn3: IOFunction<B, C>
): IOFunction<I, C>;
export function pipe<I, A, B, C, D>(
  fn1: IOFunction<I, A>,
  fn2: IOFunction<A, B>,
  fn3: IOFunction<B, C>,
  fn4: IOFunction<C, D>
): IOFunction<I, D>;
export function pipe<I, A, B, C, D, E>(
  fn1: IOFunction<I, A>,
  fn2: IOFunction<A, B>,
  fn3: IOFunction<B, C>,
  fn4: IOFunction<C, D>,
  fn5: IOFunction<D, E>
): IOFunction<I, E>;
export function pipe<I, A, B, C, D, E, F>(
  fn1: IOFunction<I, A>,
  fn2: IOFunction<A, B>,
  fn3: IOFunction<B, C>,
  fn4: IOFunction<C, D>,
  fn5: IOFunction<D, E>,
  fn6: IOFunction<E, F>
): IOFunction<I, F>;
export function pipe<I, A, B, C, D, E, F, G>(
  fn1: IOFunction<I, A>,
  fn2: IOFunction<A, B>,
  fn3: IOFunction<B, C>,
  fn4: IOFunction<C, D>,
  fn5: IOFunction<D, E>,
  fn6: IOFunction<E, F>,
  fn7: IOFunction<F, G>
): IOFunction<I, G>;
export function pipe<I, A, B, C, D, E, F, G, H>(
  fn1: IOFunction<I, A>,
  fn2: IOFunction<A, B>,
  fn3: IOFunction<B, C>,
  fn4: IOFunction<C, D>,
  fn5: IOFunction<D, E>,
  fn6: IOFunction<E, F>,
  fn7: IOFunction<F, G>,
  fn8: IOFunction<G, H>
): IOFunction<I, H>;
export function pipe<I, A, B, C, D, E, F, G, H, K>(
  fn1: IOFunction<I, A>,
  fn2: IOFunction<A, B>,
  fn3: IOFunction<B, C>,
  fn4: IOFunction<C, D>,
  fn5: IOFunction<D, E>,
  fn6: IOFunction<E, F>,
  fn7: IOFunction<F, G>,
  fn8: IOFunction<G, H>,
  fn9: IOFunction<H, K>
): IOFunction<I, K>;
export function pipe<I, A, B, C, D, E, F, G, H, K>(
  fn1: IOFunction<I, A>,
  fn2: IOFunction<A, B>,
  fn3: IOFunction<B, C>,
  fn4: IOFunction<C, D>,
  fn5: IOFunction<D, E>,
  fn6: IOFunction<E, F>,
  fn7: IOFunction<F, G>,
  fn8: IOFunction<G, H>,
  fn9: IOFunction<H, K>,
  ...fns: IOFunction<any, any>[]
): IOFunction<I, unknown>;

export function pipe<I, O>(...iofunctions: Array<IOFunction<any, any>>) {
  if (iofunctions.length === 1) return iofunctions[0];

  return function (input: I): O {
    return iofunctions.reduce(
      (prev: any, fn: IOFunction<I, O>) => fn(prev),
      input as any
    );
  };
}
