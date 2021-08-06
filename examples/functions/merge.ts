import { merge, isString } from "../../dist";

const merged = merge(
  {
    name: "Gialynguyen",
    detail: {
      address: 12,
      phone: "0336915454",
    },
    age: 12,
    score: [1, 2, 3],
    scoreDetail: [
      {
        id: "01",
        score: 1,
      },
    ],
  },
  {
    name: "TrungPham",
    detail: {
      address: 14,
      email: "gialynguyen@gmail.com",
    },
    score: [3, 4, 5],
    scoreDetail: [
      {
        id: "01",
        score: 5,
      },
    ],
  }
);

console.log("merged: ", merged);
