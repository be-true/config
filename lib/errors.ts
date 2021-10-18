import { ConfigItem } from "./ConfigItem";

class ErrorBase extends Error {}

interface ConfigItemErrorParams {
    envName: string,
    value: string,
}
class ConfigItemError extends ErrorBase {
    constructor(message: string, public params: ConfigItemErrorParams) {
        super(message);
    }
}
export class RequiredError extends ConfigItemError {};
export class FormatError extends ConfigItemError {};
export class EnumNotFoundError extends FormatError {};

export interface ConfigInitErrorParams {
    required: ConfigItem[],
    format: ConfigItem[],
}
export class ConfigInitError extends ErrorBase {
    constructor(public params: ConfigInitErrorParams) {
        super("Configuration init error");
    }
}