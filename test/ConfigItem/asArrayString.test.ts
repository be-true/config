const metatests = require("metatests");
import { ConfigItem } from "../../lib/ConfigItem";

metatests.testSync("ConfigItem: asArrayString. Success", (test: any) => {
  const item = new ConfigItem("a,b,c").asArrayString();
  test.strictEqual(item, ["a", "b", "c"]);
});

metatests.testSync("ConfigItem: asArrayString. With spaces", (test: any) => {
  const item = new ConfigItem(" a , b , c").asArrayString();
  test.strictEqual(item, ["a", "b", "c"]);
});

metatests.testSync("ConfigItem: asArrayString. Only one", (test: any) => {
  const item = new ConfigItem("a").asArrayString();
  test.strictEqual(item, ["a"]);
});
