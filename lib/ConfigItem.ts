import { EnumNotFoundError, FormatError, RequiredError } from "./errors";
import { AccessorsOption, AccessorsRequired } from "./types";

export class ConfigItem implements AccessorsOption {
  private isRequired = false;
  private descriptionText: string | undefined;
  private exampleText: string | undefined;
  private defaultValue: any | undefined;
  private type: string = "";

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

  default(value: any): AccessorsRequired {
    this.defaultValue = value;
    return this as AccessorsRequired;
  }

  required(): AccessorsRequired {
    this.isRequired = true;
    return this as AccessorsRequired;
  }

  asString(): string | undefined {
    this.setType("string");
    this.assertIsRequired();
    let value = this.getValueOrDefault();
    return value;
  }

  asInteger(): number | undefined {
    this.setType("integer");
    this.assertIsRequired();
    let value = this.getValueOrDefault();
    if (value === undefined) return undefined;
    const result = parseInt(value);
    if (Number.isNaN(result)) this.assertFormat();
    return result;
  }

  asBoolean(): boolean | undefined {
    this.setType("boolean: true, false");
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
    this.setType("url");
    if (value === undefined) return undefined;
    if (value.indexOf("http://") !== 0 && value.indexOf("https://") !== 0) {
      this.assertFormat();
    }
    return value.replace(/\/+$/, "");
  }

  asEnum<T extends string>(listValues: T[]): T | undefined {
    this.setType("enum: " + listValues.join(", "));
    this.assertIsRequired();
    let value = this.getValueOrDefault();
    if (value === undefined) return undefined;
    value = value.toLowerCase();
    const enums = listValues.map((i) => i.toLowerCase());
    if (!enums.includes(value)) this.assertEnum();
    return value as T;
  }

  asArrayString(): string[] | undefined {
    this.setType("string[]");
    this.assertIsRequired();
    let value = this.getValueOrDefault();
    if (value === undefined) return undefined;
    return value.split(",").map((i) => i.trim());
  }

  export() {
    return {
      value: this.value,
      variable: this.envName,
      context: this.context,
      required: this.isRequired,
      description: this.descriptionText,
      type: this.type,
      example: this.exampleText,
      default: this.defaultValue,
    };
  }

  private assertIsRequired() {
    if (
      this.isRequired &&
      this.value === undefined &&
      this.defaultValue === undefined
    ) {
      const params = this.createErrorParams();
      throw new RequiredError(
        `Required environment variable '${this.envName}'`,
        params
      );
    }
  }

  private assertFormat() {
    const params = this.createErrorParams();
    throw new FormatError(
      `Not valid format for environment variable '${this.envName}'`,
      params
    );
  }

  private assertEnum() {
    const params = this.createErrorParams();
    throw new EnumNotFoundError(
      `Not found item '${this.value}' for environment variable '${this.envName}'`,
      params
    );
  }

  private getValueOrDefault() {
    let value = this.value;
    if (value === undefined && this.defaultValue !== undefined) {
      value = this.defaultValue;
    }

    return value;
  }

  private createErrorParams() {
    return {
      envName: this.envName || "",
      value: this.value || "",
    };
  }

  private setType(type: string) {
    this.type = type;
  }
}
