const metatests = require("metatests");
import { configInit } from "../../configInit";

metatests.test("ConfigInit", async (test: any) => {
    await configInit();
    test.end()
});