const metatests = require("metatests");
import { ConfigItem } from "../../lib/ConfigItem";
import { FormatError } from "../../lib/errors";

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

metatests.testSync("ConfigItem: asUrl. Last slash trimming", (test: any) => {
    const item = new ConfigItem("https://domain.ru/").asUrl();
    test.strictEqual(item, "https://domain.ru")
});

metatests.testSync("ConfigItem: asUrl. Example as default", (test: any) => {
    const item = new ConfigItem('https://asd.com');
    item.asUrl()
    test.strictEqual(item.export().type, "url");
});

metatests.testSync("ConfigItem: asUrl. Example as handle setup", (test: any) => {
    const item = new ConfigItem("https://domain.ru").example("my example text");
    item.asUrl();
    test.strictEqual(item.export().example, "my example text");
});