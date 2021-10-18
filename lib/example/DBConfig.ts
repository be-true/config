import { configClass } from "../configClass";
import { ConfigBase } from "../ConfigBase";

@configClass
export class DBConfig extends ConfigBase {
  context: string = "Подключение к базе данных";
  get host() {
    return this.fromEnv("DB_HOST")
      .description("Хост для обращения к БД")
      .required()
      .asUrl();
  }

  get database() {
    return this.fromEnv("DB_DATABASE")
      .description("Используемая база данных")
      .required()
      .asString();
  }

  get user() {
    return this.fromEnv("DB_USER")
      .description("Логин для подключения")
      .required()
      .asString();
  }

  get password() {
    return this.fromEnv("DB_PASSWORD")
      .description("Пароль для подключения")
      .required()
      .asString();
  }
}
