import { pipe } from "../../dist/";

const fullName = pipe(
  (rawData: any): { firstName: string; lastName: string } => ({
    firstName: rawData.firstName,
    lastName: rawData.lastName,
  }),
  ({ firstName, lastName }) => `${firstName} ${lastName}`
);

const employeeFullName = fullName({ firstName: "Nguyen Gia", lastName: "Ly" });

console.log("employeeFullName: ", employeeFullName);
