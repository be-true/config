const metatests = require("metatests");
import { ConfigItem } from "../../lib/ConfigItem";
import { RequiredError } from "../../lib/errors";

metatests.testSync("ConfigItem: asBoolean. 0", (test: any) => {
    const item = new ConfigItem("0").asBoolean();
    test.strictEqual(item, false);
});

metatests.testSync("ConfigItem: asBoolean. Default false", (test: any) => {
    const item = new ConfigItem().default(false).asBoolean();
    test.strictEqual(item, false);
});

metatests.testSync("ConfigItem: asBoolean. Required", (test: any) => {
    try {
        const item = new ConfigItem().required().asBoolean();
        test.strictEqual(true, false);
    } catch(e) {
        test.strictEqual(e instanceof RequiredError, true);
    }
});

metatests.testSync("ConfigItem: asBoolean. Default '0", (test: any) => {
    const item = new ConfigItem().default('0').asBoolean();
    test.strictEqual(item, false);
});

metatests.testSync("ConfigItem: asBoolean. 1", (test: any) => {
    const item = new ConfigItem("1").asBoolean();
    test.strictEqual(item, true);
});

metatests.testSync("ConfigItem: asBoolean. true", (test: any) => {
    const item = new ConfigItem("true").asBoolean();
    test.strictEqual(item, true);
});

metatests.testSync("ConfigItem: asBoolean. false", (test: any) => {
    const item = new ConfigItem("false").asBoolean();
    test.strictEqual(item, false);
});

metatests.testSync("ConfigItem: asBoolean. False", (test: any) => {
    const item = new ConfigItem("False").asBoolean();
    test.strictEqual(item, false);
});

metatests.testSync("ConfigItem: asBoolean. Example as default", (test: any) => {
    const item = new ConfigItem("False");
    item.asBoolean();
    test.strictEqual(item.export().type, "boolean: true, false, 0, 1");
});

metatests.testSync("ConfigItem: asBoolean. Example as handle setup", (test: any) => {
    const item = new ConfigItem("False").example("my example text");
    item.asBoolean();
    test.strictEqual(item.export().example, "my example text");
});