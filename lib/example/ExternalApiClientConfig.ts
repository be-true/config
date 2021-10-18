import { configClass } from "../configClass";
import { ConfigBase } from "../ConfigBase";

@configClass
export class ExternalApiClientConfig extends ConfigBase {
  context: string = "Api к внешнему клиенту";
  get apiHost() {
    return this.fromEnv("API_HOST")
      .description("URL внешнего API")
      .required()
      .asUrl();
  }

  get apiToken() {
    return this.fromEnv("API_TOKEN")
      .description("Токен доступа внешнего API")
      .required()
      .asString();
  }
}
