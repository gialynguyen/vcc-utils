export interface IOFunction<I, O> {
	(input: I): O;
}

export interface IObject {
	[key: string]: any
}