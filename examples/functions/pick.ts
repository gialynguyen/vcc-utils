import { pick } from "../../dist";

const picked = pick({ name: "gialynguyen", age: 12 }, ["age"]);
const pickerFunction = pick({ name: "gialynguyen", age: 12 }, (_, key) => {
	if (key === 'name') return true;

	return false;
});

console.log('picked: ', picked);
console.log('pickerFunction: ', pickerFunction);


