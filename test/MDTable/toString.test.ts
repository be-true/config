import fs from "fs";
const metatests = require("metatests");
import { MDTable } from "../../lib/MDTable";

function readFile(path: string): string {
    return fs.readFileSync(__dirname + `/fixtures/${path}`).toString();
}

metatests.testSync("MDTable: toString. test-simple ", (test: any) => {
    const data = [
        { name: "Max Loll", age: 23 },
        { name: "Alex", age: 43 }
    ]
    const item = new MDTable(data);
    test.strictEqual(item.toString(), readFile('test-simple.md'));
});

metatests.testSync("MDTable: toString. without-field ", (test: any) => {
    const data = [
        { name: "Max Loll", age: 23 },
        { name: "Alex" }
    ]
    const item = new MDTable(data);
    test.strictEqual(item.toString(), readFile('without-field.md'));
});

metatests.testSync("MDTable: toString. setup-columns ", (test: any) => {
    const data = [
        { name: "Max Loll", age: 23, mass: 83 },
        { name: "Alex", age: 43, mass: 100 }
    ]
    const item = new MDTable(data, { columns: ["name", "age"]});
    test.strictEqual(item.toString(), readFile('setup-columns.md'));
});