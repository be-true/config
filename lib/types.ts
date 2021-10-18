export interface Accessors<isRequired = undefined> {
    asString(): isRequired extends undefined? string | undefined : string ;
    asInteger(): isRequired extends undefined? number | undefined : number ;
    asBoolean(): isRequired extends undefined? boolean | undefined : boolean ;
    asUrl(): isRequired extends undefined? string | undefined : string ;
    asEnum(listValues: string[]): isRequired extends undefined? string | undefined : string ;
}

export interface AccessorsOption extends Accessors {
    description(text: string): this;
    example(text: string): this;
    default(value: any): this;
    required(): AccessorsRequired;
}

export interface AccessorsRequired extends Accessors<true> {
    description(text: string): this;
    example(text: string): this;
    default(value: any): this;
}

export type IFromEnv = (envName: string, context: string) => AccessorsOption;

export interface ConfigInitOptions {
    throwError?: boolean
}

