const metatests = require("metatests");
import { configInit } from "../../configInit";
import { ConfigInitError } from "../../errors";

const envs = {
  DB_HOST: "http://postgres",
  DB_DATABASE: "project",
  DB_USER: "user",
  DB_PASSWORD: "12345",
  API_HOST: "http://domain.ru",
  API_TOKEN: "asdkhsfkjb",
};

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

metatests.test("ConfigInit: Without error", async (test: any) => {
  setEnvs(envs);
  await configInit({ throwError: true });
  test.end();
});

metatests.test("ConfigInit: Required. One variable.", async (test: any) => {
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

metatests.test("ConfigInit: Format. One variable.", async (test: any) => {
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
