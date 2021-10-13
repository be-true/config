import { Schema, Validator } from "jsonschema";

function projection<T extends string, U = { [key in T]: { $ref: string } }>(
  id: string,
  fields: T[]
): U {
  const result: any = {};

  fields.forEach((field) => {
    result[field] = { $ref: `/${id}#/properties/${field}` };
  });

  return result;
}

function projection2<
  S extends Schema,
  F = keyof S["properties"],
  U = { [key in keyof S["properties"]]: { $ref: string } }
>(schema: S, fields: F): U {
  const result: any = {};

  //@ts-ignore
  fields.forEach((field) => {
    if ((schema?.properties ?? {})[field] === undefined)
      throw new Error(`field '${field}' not in schema '${schema.id}'`);
    result[field] = { $ref: `/${schema.id}#/properties/${field}` };
  });

  return result;
}

const User: Schema = {
  id: "User",
  type: "object",
  required: ["login", "passwordHash", "email", "name"],
  properties: {
    login: { type: "string", description: "Login пользователя" },
    password: { type: "string", description: "Пароль пользователя" },
    passwordHash: { type: "string", description: "Хеш пароля пользователя" },
    email: { type: "string" },
    name: { type: "string" },
  },
};

const Login: Schema = {
  id: "Login",
  type: "object",
  required: ["login", "password"],
  properties: {
    ...projection2(User, ["login2", "password"]),
  },
};

const validator = new Validator();
validator.addSchema(Login);
validator.addSchema(User);

console.log(validator.schemas);
const result = validator.validate({ login: "asd", password: "asd" }, Login);
// result.addError({
//     message: 'string',
//     name: 'string',
//     argument: 'name'
// });
console.log(result.errors);
