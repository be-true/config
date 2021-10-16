import { ParseError, RequiredError } from "./errors";
import { Accessors, AccessorsOption, AccessorsRequired } from "./types";

export class ConfigItem implements AccessorsOption {
  private isRequired = false;
  private descriptionText: string | undefined;
  private exampleText: string | undefined;
  private defaultValue: any | undefined;

  constructor(private value?: string) {}

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
    if (Number.isNaN(result)) throw new ParseError();
    return result;
  }

  asBoolean(): boolean | undefined {
    this.assertIsRequired();
    let value = this.getValueOrDefault();
    if (value === undefined) return undefined;
    if (typeof value === 'boolean') return value;
    value = value.toLowerCase();
    if(['0', 'false'].includes(value)) return false;
    if(['1', 'true'].includes(value)) return true;
    throw new ParseError();
  }

  asUrl(): string | undefined {
    const value = this.asString();
    if (value === undefined) return undefined;
    if (value.indexOf("http://") !== 0 && value.indexOf("https://") !== 0) {
      throw new ParseError();
    }
    return value.replace(/\/+$/, "");
  }

  private assertIsRequired() {
    if (
      this.isRequired &&
      this.value === undefined &&
      this.defaultValue === undefined
    ) {
      throw new RequiredError("Required field");
    }
  }

  private getValueOrDefault() {
    let value = this.value;
    if (value === undefined && this.defaultValue !== undefined) {
      value = this.defaultValue;
    }

    return value;
  }
}
