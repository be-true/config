import { IExternalApiClientConfig } from ".";
import { ConfigBase, configClass } from "../../lib";

@configClass
export class ExternalApiClientConfig extends ConfigBase implements IExternalApiClientConfig {
  context: string = "External API";
  get apiHost() {
    return this.fromEnv("API_HOST")
      .description("URL of external API")
      .required()
      .asUrl();
  }

  get apiToken() {
    return this.fromEnv("API_TOKEN")
      .description("Access token of external API")
      .required()
      .asString();
  }
}
