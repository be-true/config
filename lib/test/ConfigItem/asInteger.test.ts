const metatests = require("metatests");
import { ConfigItem } from "../../ConfigItem";
import { FormatError, RequiredError } from "../../errors";


metatests.testSync("ConfigItem: asInteger", (test: any) => {
    const item = new ConfigItem("1").asInteger();
    test.strictEqual(item, 1);
});

metatests.testSync("ConfigItem: asInteger. With space", (test: any) => {
    const item = new ConfigItem(" 1 ").asInteger();
    test.strictEqual(item, 1);
});

metatests.testSync("ConfigItem: asInteger. Negative", (test: any) => {
    const item = new ConfigItem("-1").asInteger();
    test.strictEqual(item, -1);
});

metatests.testSync("ConfigItem: asInteger. Default value", (test: any) => {
    const item = new ConfigItem().default(1).asInteger();
    test.strictEqual(item, 1);
});

metatests.testSync("ConfigItem: asInteger. Required with default", (test: any) => {
    const item = new ConfigItem().required().default(1).asInteger();
    test.strictEqual(item, 1);
});

metatests.testSync("ConfigItem: asInteger. Parse error", (test: any) => {
    try {
        new ConfigItem("a").asInteger();
    } catch(e) {
        test.strictEqual(e instanceof FormatError, true);
    }
});

metatests.testSync("ConfigItem: asInteger. Required", (test: any) => {
    try {
        new ConfigItem().required().asInteger();
    } catch(e) {
        test.strictEqual(e instanceof RequiredError, true);
    }
});