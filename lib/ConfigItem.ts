import { EnumNotFoundError, FormatError, RequiredError } from "./errors";
import { AccessorsOption, AccessorsRequired } from "./types";

export class ConfigItem implements AccessorsOption {
  private isRequired = false;
  private descriptionText: string | undefined;
  private exampleText: string | undefined;
  private defaultValue: any | undefined;

  constructor(
    private value?: string,
    private envName?: string,
    private context?: string
  ) {}

  description(text: string): this {
    this.descriptionText = text;
    return this;
  }

  example(text: string): this {
    this.exampleText = text;
    return this;
  }

  default(value: any): this {
    this.defaultValue = value;
    return this;
  }

  required(): AccessorsRequired {
    this.isRequired = true;
    return this as AccessorsRequired;
  }

  asString(): string | undefined {
    this.assertIsRequired();
    let value = this.getValueOrDefault();
    return value;
  }

  asInteger(): number | undefined {
    this.assertIsRequired();
    let value = this.getValueOrDefault();
    if (value === undefined) return undefined;
    const result = parseInt(value);
    if (Number.isNaN(result)) this.assertFormat();
    return result;
  }

  asBoolean(): boolean | undefined {
    this.assertIsRequired();
    let value = this.getValueOrDefault();
    if (value === undefined) return undefined;
    if (typeof value === "boolean") return value;
    value = value.toLowerCase();
    if (["0", "false"].includes(value)) return false;
    if (["1", "true"].includes(value)) return true;
    this.assertFormat();
  }

  asUrl(): string | undefined {
    const value = this.asString();
    if (value === undefined) return undefined;
    if (value.indexOf("http://") !== 0 && value.indexOf("https://") !== 0) {
      this.assertFormat();
    }
    return value.replace(/\/+$/, "");
  }

  asEnum(listValues: string[]): string | undefined {
    this.assertIsRequired();
    let value = this.getValueOrDefault();
    if (value === undefined) return undefined;
    value = value.toLowerCase();
    const enums = listValues.map((i) => i.toLowerCase());
    if (!enums.includes(value)) this.assertEnum();
    return value;
  }

  private assertIsRequired() {
    if (
      this.isRequired &&
      this.value === undefined &&
      this.defaultValue === undefined
    ) {
      throw new RequiredError(`Required environment variable '${this.envName}'`, {
        envName: this.envName || '',
        value: this.value || '',
      });
    }
  }

  private assertFormat() {
      throw new FormatError(`Not valid format for environment variable '${this.envName}'`, {
        envName: this.envName || '',
        value: this.value || '',
      });
  }

  private assertEnum() {
      throw new EnumNotFoundError(`Not found item '${this.value}' for environment variable '${this.envName}'`, {
        envName: this.envName || '',
        value: this.value || '',
      });
  }

  private getValueOrDefault() {
    let value = this.value;
    if (value === undefined && this.defaultValue !== undefined) {
      value = this.defaultValue;
    }

    return value;
  }
}
