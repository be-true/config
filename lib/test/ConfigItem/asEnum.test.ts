const metatests = require("metatests");
import { ConfigItem } from "../../ConfigItem";
import { EnumNotFoundError, RequiredError } from "../../errors";

const enumList = ["production", "develop", "localhost", "staging"];

metatests.testSync("ConfigItem: asEnum", (test: any) => {
    const item = new ConfigItem("production").asEnum(enumList);
    test.strictEqual(item, "production");
});

metatests.testSync("ConfigItem: asEnum. Case unsensitive", (test: any) => {
    const item = new ConfigItem("Production").asEnum(enumList);
    test.strictEqual(item, "production");
});

metatests.testSync("ConfigItem: asEnum. Default", (test: any) => {
    const item = new ConfigItem().default("localhost").asEnum(enumList);
    test.strictEqual(item, "localhost");
});

metatests.testSync("ConfigItem: asEnum. Required", (test: any) => {
    try {
        const item = new ConfigItem().required().asEnum(enumList);
        test.strictEqual(false, true);
    } catch(e) {
        test.strictEqual(e instanceof RequiredError, true);
    }
});

metatests.testSync("ConfigItem: asEnum. Case unsensitive", (test: any) => {
    try {
        const item = new ConfigItem("other").asEnum(enumList);
        test.strictEqual(false, true);
    } catch(e) {
        test.strictEqual(e instanceof EnumNotFoundError, true);
    }
});