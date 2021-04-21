export const isArray = Array.isArray || function (arr: any) {
	return toString.call(arr) == '[object Array]';
  };