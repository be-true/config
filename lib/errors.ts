class ErrorBase extends Error {}

export class RequiredError extends ErrorBase {};
export class ParseError extends ErrorBase {
    constructor(message = "Не верный формат") {
        super(message);
    }
};