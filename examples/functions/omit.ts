import { omit, omitBy } from "../../dist";

const omitted = omit({ name: "gialynguyen", age: 12 }, ["age"]);

const omittedFilter = omit({ name: "gialynguyen", age: 12 }, (_, key) => {
  if (key === "name") return true;

  return false;
});

const omittedBy = omitBy(
  {
    name: "gialynguyen",
    age: 12,
    addressIds: ["001"],
    detail: { phone: "099365287", email: "gialynguyen@gmail.com" },
  },
  { addressIds: true, age: true, detail: { phone: true } }
);

console.log("omitted: ", omitted);
console.log("omittedFilter: ", omittedFilter);
console.log("omittedBy: ", omittedBy.detail);
