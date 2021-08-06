export const isArray =
  Array.isArray ||
  function (arr: any): arr is [] {
    return toString.call(arr) == "[object Array]";
  };
