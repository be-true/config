import { IDBConfig } from ".";
import { ConfigBase, configClass } from "../../lib";

@configClass
export class DBConfig extends ConfigBase implements IDBConfig {
  context: string = "Database";
  get host() {
    return this.fromEnv("DB_HOST")
      .description("Host")
      .required()
      .asUrl();
  }

  get database() {
    return this.fromEnv("DB_DATABASE")
      .description("Database name")
      .required()
      .asString();
  }

  get user() {
    return this.fromEnv("DB_USER")
      .description("Login")
      .required()
      .asString();
  }

  get password() {
    return this.fromEnv("DB_PASSWORD")
      .description("Password")
      .required()
      .asString();
  }
}
