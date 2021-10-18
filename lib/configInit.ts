import { configClasses } from "./configClass";

import "./example/DBConfig";
import "./example/ServerConfig";
import "./example/ExternalApiClientConfig";
import { FormatError, RequiredError } from "./errors";
import { ConfigItem } from "./ConfigItem";

export const configInit = async () => {
  const errorsRequired: ConfigItem[] = [];
  const errorsFormat: ConfigItem[] = [];

  configClasses.forEach((className) => {
    const config: any = new className();
    const params: { [key: string]: any } = Object.getOwnPropertyDescriptors(
      // @ts-ignore
      config.__proto__
    );

    Object.entries(params)
      .filter(([_, desc]) => desc.get !== undefined) // Получаем параметры, которые реализованы в виде геттера
      .forEach(([name, _]) => {
          try {
              config[name]; // Вызываем гетер, для получения ошибки и регистрации ее
          } catch (e) {
              if (e instanceof RequiredError) {
                errorsRequired.push(config.getItemByEnvName(e.params.envName))
              } else if (e instanceof FormatError) {
                errorsFormat.push(config.getItemByEnvName(e.params.envName));
              } else {
                throw e;
              }
          }
      });
    });

    if (errorsRequired.length > 0 || errorsFormat.length > 0) {
      if (errorsRequired.length > 0) {
        console.log();
        console.log("\x1b[41m %s \x1b[0m", "Need to be set next environment variables");
        console.table(errorsRequired.map(i => i.export()), ['context', 'variable', 'type', 'description', 'example']);
      }
      if (errorsFormat.length > 0) {
        console.log();
        console.log("\x1b[41m %s \x1b[0m", "Error format for next environment variables");
        console.table(errorsFormat.map(i => i.export()), ['context', 'variable', 'type', 'value', 'description', 'type', 'example']);
      }
      process.exit(1);
    }
};
