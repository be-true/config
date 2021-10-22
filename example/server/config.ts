import { IServerConfig } from ".";
import { ConfigBase, configClass } from "../../lib";

@configClass
export class ServerConfig extends ConfigBase implements IServerConfig {
  context: string = "WEB server";
  get appHost() {
    return this.fromEnv("APP_HOST")
      .description("URL address of application")
      .required()
      .default("http://localhost")
      .asUrl();
  }

  get appPort() {
    return this.fromEnv("APP_PORT")
      .description("Port of application")
      .required()
      .default(3000)
      .asInteger();
  }

  get appEnv() {
    return this.fromEnv("APP_ENV")
      .description("Environment in which application will be run")
      .required()
      .default("localhost")
      .asEnum(["production", "staging", "develop", "localhost"]);
  }

  get appName() {
    return this.fromEnv("APP_NAME")
      .description("Name of application")
      .asString();
  }
}
