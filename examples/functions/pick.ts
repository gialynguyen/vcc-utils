import { pick, pickBy } from "../../dist";

const picked = pick({ name: "gialynguyen", age: 12 }, ["age"]);

const pickerFunction = pick({ name: "gialynguyen", age: 12 }, (_, key) => {
  if (key === "name") return true;

  return false;
});

const pickedBy = pickBy(
  {
    name: "gialynguyen",
    age: 12,
    address: { name: "my home", detail: "Nha Trang" },
  },
  { name: true, address: { name: true } }
);

console.log("picked: ", picked);
console.log("pickerFunction: ", pickerFunction);
console.log("pickedBy: ", pickedBy);
