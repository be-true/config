import { ConfigItem } from "./ConfigItem";

export abstract class ConfigBase {
  abstract context: string;
  private items: {[key: string]: ConfigItem} = {};

  fromEnv(envName: string): ConfigItem {
    const value = this.getEnvValue(envName);
    const item =  new ConfigItem(value, envName, this.context)
    this.items[envName] = item;
    return item;
  }

  getItemByEnvName(envName: string): ConfigItem | undefined {
    return this.items[envName];
  }

  getItems(): ConfigItem[] {
    return Object.values(this.items);
  }

  public runItem(getterName: string) {
    const self = this;
    // @ts-ignore
    self[getterName]
  }

  protected getEnvValue(envName: string) {
    return process.env[envName];
  }
}
