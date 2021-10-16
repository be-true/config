const metatests = require("metatests");
import { ConfigItem } from "../../ConfigItem";
import { FormatError } from "../../errors";

metatests.testSync("ConfigItem: asUrl", (test: any) => {
    const item = new ConfigItem("http://domain.ru").asUrl();
    test.strictEqual(item, "http://domain.ru");
});

metatests.testSync("ConfigItem: asUrl. ParseError. Schema", (test: any) => {
    try {
        new ConfigItem("domain.ru").asUrl();
        test.strictEqual(false, true)
    } catch(e) {
        test.strictEqual(e instanceof FormatError, true)
    }
});

metatests.testSync("ConfigItem: asUrl. Trim last slash", (test: any) => {
    const item = new ConfigItem("https://domain.ru/").asUrl();
    test.strictEqual(item, "https://domain.ru")
});