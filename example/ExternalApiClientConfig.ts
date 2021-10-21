import { configClass } from "../lib/configClass";
import { ConfigBase } from "../lib/ConfigBase";

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
