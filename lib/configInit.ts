import { ConfigInitError, FormatError, RequiredError } from "./errors";
import { ConfigItem } from "./ConfigItem";
import { ConfigInitOptions } from "./types";
import { configIterator } from "./iterators";

export const configInit = async (options?: ConfigInitOptions) => {
  const required: ConfigItem[] = [];
  const format: ConfigItem[] = [];

  for (const { config, getterNames } of configIterator()) {
    for (const getterName of getterNames) {
      try {
        config.runItem(getterName); // Вызываем гетер, для получения ошибки и регистрации ее
      } catch (e) {
        if (e instanceof RequiredError) {
          const item = config.getItemByEnvName(e.params.envName);
          item && required.push(item);
        } else if (e instanceof FormatError) {
          const item = config.getItemByEnvName(e.params.envName);
          item && format.push(item);
        } else {
          throw e;
        }
      }
    }
  }

  if (required.length > 0 || format.length > 0) {
    if (options?.throwError) {
      throw new ConfigInitError({
        required,
        format,
      });
    } else {
      if (required.length > 0) {
        console.log();
        console.log(
          "\x1b[41m %s \x1b[0m",
          "Need to be set next environment variables"
        );
        console.table(
          required.map((i) => i.export()),
          ["context", "variable", "type", "description", "example"]
        );
      }
      if (format.length > 0) {
        console.log();
        console.log(
          "\x1b[41m %s \x1b[0m",
          "Error format for next environment variables"
        );
        console.table(
          format.map((i) => i.export()),
          ["context", "variable", "type", "value", "description", "example"]
        );
      }

      process.exit(1);
    }
  }
};
