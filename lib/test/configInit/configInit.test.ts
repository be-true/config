const metatests = require("metatests");
import { configInit } from "../../configInit";

metatests.test("ConfigInit", async (test: any) => {
    process.env['APP_PORT'] = 'asd';
    await configInit();
    test.end()
});