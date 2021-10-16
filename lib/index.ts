import { ConfigItem } from "./ConfigItem";
import { IFromEnv } from "./types";

export const fromEnv: IFromEnv = (envName: string, context: string) => {
  const value = process.env[envName];
  return new ConfigItem(value, envName, context);
}

fromEnv("APP_HOST", "Test").required().asString()