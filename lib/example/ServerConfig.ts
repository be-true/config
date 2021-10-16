import { fromEnvTest as fromEnv } from "../test/fromEnvTest";
import { configClass } from "../configClass";

const context = "Api к внешнему клиенту";
@configClass
export class ServerConfig {
  get appHost() {
    return fromEnv("APP_HOST", context)
      .description("Хост на котором запускается веб сервер")
      .required()
      .default("http://localhost")
      .asUrl();
  }

  get appPort() {
    return fromEnv("APP_PORT", context)
      .description("Порт на котором запускается веб сервер")
      .required()
      .default(3000)
      .asInteger();
  }

  get appEnv() {
    return fromEnv("APP_ENV", context)
      .description("Окружение в котором запускается приложение")
      .required()
      .default("localhost")
      .asEnum(["production", "staging", "develop", "localhost"]);
  }
}
