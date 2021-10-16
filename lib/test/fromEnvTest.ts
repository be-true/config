import { ConfigItem } from "../ConfigItem";
import { IFromEnv } from "../types";

const envs: {[key: string]: string | undefined} = {};

export const fromEnvTest: IFromEnv = (envName: string, context: string) => {
  const value = envs[envName];
  return new ConfigItem(value, envName, context);
};
