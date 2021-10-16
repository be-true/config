import { configClasses } from "./configClass";

import "./example/DBConfig";
import "./example/ServerConfig";
import "./example/ExternalApiClientConfig";
import { FormatError, RequiredError } from "./errors";

export const configInit = async () => {
  configClasses.forEach((className) => {
    const config: any = new className();
    const params: { [key: string]: any } = Object.getOwnPropertyDescriptors(
      // @ts-ignore
      config.__proto__
    );

    const errorsRequired = [];
    const errorsFormat = [];
    Object.entries(params)
      .filter(([_, desc]) => desc.get !== undefined) // Получаем параметры, которые реализованы в виде геттера
      .forEach(([name, _]) => {
          try {
              config[name]; // Вызываем гетер, для получения ошибки и регистрации ее в ответ
          } catch (e) {
              if (e instanceof RequiredError) {
                errorsRequired.push(config)
              } else if (e instanceof FormatError) {
                errorsFormat.push(config);
              }

              throw e;
          }
      });
  });
};
