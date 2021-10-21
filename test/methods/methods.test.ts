const metatests = require("metatests");
import fs from "fs";
import { configInit } from "../../lib/configInit";
import { ConfigInitError } from "../../lib/errors";
import { configExport } from "../../lib/configExport";

// Import Config for registered by decorator @configClass
import "../../example/DBConfig";
import "../../example/ServerConfig";
import "../../example/ExternalApiClientConfig";

const envs = {
  DB_HOST: "http://postgres",
  DB_DATABASE: "project",
  DB_USER: "user",
  DB_PASSWORD: "12345",
  API_HOST: "http://domain.ru",
  API_TOKEN: "asdkhsfkjb",
};

function readFile(path: string): string {
  return fs.readFileSync(__dirname + `/out/${path}`).toString();
}

const clear = () => {
  Object.entries(envs).forEach(([name, _]) => {
    delete process.env[name];
  });
};
const setEnvs = (envsList: { [key: string]: string }) => {
  clear();
  Object.entries(envsList).forEach(([name, value]) => {
    process.env[name] = value;
  });
};

metatests.test("configInit: Success", async (test: any) => {
  setEnvs(envs);
  await configInit({ throwError: true });
  test.end();
});

metatests.test("configInit: Required error", async (test: any) => {
  const envsTest: any = { ...envs };
  delete envsTest.DB_HOST;
  setEnvs(envsTest);
  try {
    await configInit({ throwError: true });
  } catch (e) {
    if (e instanceof ConfigInitError) {
      test.strictEqual(e.params.required.length, 1);
      test.strictEqual(e.params.required[0].export().variable, "DB_HOST");
    } else {
        test.strictEqual("An error must thrown", 'ConfigInitError');
    }
  }

  test.end();
});

metatests.test("configInit: Format error.", async (test: any) => {
  const envsTest: any = { ...envs };
  envsTest.APP_PORT = 'any text instead of number';
  setEnvs(envsTest);
  try {
    await configInit({ throwError: true });
  } catch (e) {
    if (e instanceof ConfigInitError) {
      test.strictEqual(e.params.format.length, 1);
      test.strictEqual(e.params.format[0].export().variable, "APP_PORT");
    } else {
        test.strictEqual("An error must thrown", 'ConfigInitError');
    }
  }

  test.end();
});

metatests.test("configExport:", async (test: any) => {
  await configExport({ target: __dirname + "/out/out.md" });
  test.strictEqual(readFile("out.md"), readFile("out.test.md"))
  test.end();
});
