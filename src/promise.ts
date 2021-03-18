export class CancelablePromise {
  static cancelErrorSymbol = Symbol("CancelError");

  abortSymbol: symbol;

  abortPromise: Promise<unknown>;

  reject!: <T>(reason?: T) => void;

  complete: boolean;

  constructor() {
    this.abortSymbol = Symbol("cancelled");
    this.abortPromise = new Promise((_, reject) => {
      this.reject = reject;
      return this.reject;
    });
    this.complete = false;
  }

  static CancelError() {
    return this.cancelErrorSymbol;
  }

  static isCancelError(error: unknown) {
    return error === this.cancelErrorSymbol;
  }

  wrap<P>(promise: Promise<P>) {
    return Promise.race([promise, this.abortPromise])
      .then((res) => res as P)
      .catch((error) => {
        if (error === this.abortSymbol)
          return Promise.reject(CancelablePromise.CancelError());

        // eslint-disable-next-line consistent-return
        return Promise.reject(error);
      })
      .finally(() => {
        this.complete = true;
      });
  }

  async cancel() {
    if (this.complete) return;
    this.reject(this.abortSymbol);
  }
}

export const takeLastestPromise = <P>(
  asyncFunction: (...args: unknown[]) => Promise<P>
) => {
  let cancelSubject: CancelablePromise;

  return (...args: Parameters<typeof asyncFunction>) => {
    if (cancelSubject) cancelSubject.cancel();
    cancelSubject = new CancelablePromise();

    return cancelSubject.wrap(asyncFunction(...args));
  };
};
