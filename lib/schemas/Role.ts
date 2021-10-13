import { MyContractor, Schemas } from "..";

export default (contractor: MyContractor) =>
  contractor
    .addSchema(Schemas.Role, {
      type: "object",
      required: ["name"],
      properties: {
        name: { type: "string", description: "Имя роли" },
        permissions: { type: "array", description: "Разрешения для роли" },
      },
    });
