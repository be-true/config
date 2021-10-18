const metatests = require("metatests");
import { ConfigItem } from "../../ConfigItem";
import { RequiredError } from "../../errors";

metatests.testSync("ConfigItem: asString.", (test: any) => {
    const item = new ConfigItem("Text").asString();
    test.strictEqual(item, "Text");
});

metatests.testSync("ConfigItem: asString. Required", (test: any) => {
    try {
        new ConfigItem().required().asString();
        test.strictEqual(false, true)
    } catch(e) {
        test.strictEqual(e instanceof RequiredError, true)
    }
});

metatests.testSync("ConfigItem: asString. Default", (test: any) => {
    const item = new ConfigItem().default("Default").asString();
    test.strictEqual(item, "Default");
});

metatests.testSync("ConfigItem: asString. Example as default", (test: any) => {
    const item = new ConfigItem('a');
    item.asString();
    test.strictEqual(item.export().type, "string");
});

metatests.testSync("ConfigItem: asString. Example as handle setup", (test: any) => {
    const item = new ConfigItem("").example("my example text");
    item.asString();
    test.strictEqual(item.export().example, "my example text");
});