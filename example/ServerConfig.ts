import { configClass } from "../lib/configClass";
import { ConfigBase } from "../lib/ConfigBase";

@configClass
export class ServerConfig extends ConfigBase {
  context: string = "Настройки WEB сервера";
  get appHost() {
    return this.fromEnv("APP_HOST")
      .description("Хост на котором запускается веб сервер")
      .required()
      .default("http://localhost")
      .asUrl();
  }

  get appPort() {
    return this.fromEnv("APP_PORT")
      .description("Порт на котором запускается веб сервер")
      .required()
      .default(3000)
      .asInteger();
  }

  get appEnv() {
    return this.fromEnv("APP_ENV")
      .description("Окружение в котором запускается приложение")
      .required()
      .default("localhost")
      .asEnum(["production", "staging", "develop", "localhost"]);
  }

  get appName() {
    return this.fromEnv("APP_NAME")
      .description("Название запущенного приложения")
      .asString();
  }
}
