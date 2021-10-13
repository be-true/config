import { MyContractor, Schemas } from "..";
import { projection } from "../contractor";

export default (contractor: MyContractor) =>
  contractor
    .addSchema(Schemas.User, {
      type: "object",
      required: ["login", "passwordHash", "email", "name"],
      properties: {
        login: { type: "string", description: "Login пользователя" },
        password: { type: "string", description: "Пароль пользователя" },
        passwordHash: {
          type: "string",
          description: "Хеш пароля пользователя",
        },
        email: { type: "string" },
        name: { type: "string" },
      },
    })
    .addSchema(Schemas.UserLogin, {
      type: "object",
      required: ["login", "password"],
      properties: {
        ...projection(Schemas.User, ["login", "password"]),
      },
    });
