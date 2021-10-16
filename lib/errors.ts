class ErrorBase extends Error {}

export class RequiredError extends ErrorBase {};
export class ParseError extends ErrorBase {
    constructor(message = "Не верный формат") {
        super(message);
    }
};
export class EnumNotFoundError extends ErrorBase {
    constructor(message = "Не найдено значение среди указанных") {
        super(message);
    }
};