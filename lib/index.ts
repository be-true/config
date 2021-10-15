import { ConfigItem } from "./ConfigItem";
import { IFromEnv } from "./types";

export const fromEnv: IFromEnv = (envName: string) => {
  const value = "1";
  return new ConfigItem(value);
}

fromEnv("APP_HOST").required().asString()