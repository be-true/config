// Application should be imported for registration configurations classes through decorator @configClass
import { configExport } from "../lib";
import "./app";

(async () => {
    // In this part documentation will be created for all configurations
    await configExport({ target: __dirname + "/out.md" })
})