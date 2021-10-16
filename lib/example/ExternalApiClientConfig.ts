import { fromEnvTest as fromEnv } from "../test/fromEnvTest";
import { configClass } from "../configClass";

const context = "Api к внешнему клиенту";
@configClass
export class ExternalApiClientConfig {
  get apiHost() {
    return fromEnv("API_HOST", context)
      .description("URL внешнего API")
      .required()
      .asUrl();
  }

  get apiToken() {
    return fromEnv("API_TOKEN", context)
      .description("Токен доступа внешнего API")
      .required()
      .asString();
  }
}
