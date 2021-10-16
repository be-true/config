import { fromEnvTest as fromEnv } from "../test/fromEnvTest";
import { configClass } from "../configClass";

const context = "Api к внешнему клиенту"
@configClass
export class DBConfig {
  get host() {
    return fromEnv("DB_HOST", context)
      .description("Хост для обращения к БД")
      .required()
      .asUrl();
  }

  get database() {
    return fromEnv("DB_DATABASE", context)
      .description("Используемая база данных")
      .required()
      .asString();
  }

  get user() {
    return fromEnv("DB_USER", context)
      .description("Логин для подключения")
      .required()
      .asString();
  }

  get password() {
    return fromEnv("DB_PASSWORD", context)
      .description("Пароль для подключения")
      .required()
      .asString();
  }
}
