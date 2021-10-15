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