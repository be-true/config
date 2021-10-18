import { configClasses } from "./configClass";

import "./example/DBConfig";
import "./example/ServerConfig";
import "./example/ExternalApiClientConfig";
import { ConfigInitError, FormatError, RequiredError } from "./errors";
import { ConfigItem } from "./ConfigItem";
import { ConfigInitOptions } from "./types";

export const configInit = async (options?: ConfigInitOptions) => {
  const required: ConfigItem[] = [];
  const format: ConfigItem[] = [];

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
                required.push(config.getItemByEnvName(e.params.envName))
              } else if (e instanceof FormatError) {
                format.push(config.getItemByEnvName(e.params.envName));
              } else {
                throw e;
              }
          }
      });
    });

    if (required.length > 0 || format.length > 0) {
      if (options?.throwError) {
        throw new ConfigInitError({
          required,
          format
        });
      } else {
        if (required.length > 0) {
          console.log();
          console.log("\x1b[41m %s \x1b[0m", "Need to be set next environment variables");
          console.table(required.map(i => i.export()), ['context', 'variable', 'type', 'description', 'example']);
        }
        if (format.length > 0) {
          console.log();
          console.log("\x1b[41m %s \x1b[0m", "Error format for next environment variables");
          console.table(format.map(i => i.export()), ['context', 'variable', 'type', 'value', 'description', 'type', 'example']);
        }
        process.exit(1);
      }
    }
};
