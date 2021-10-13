import { Contractor } from "./contractor";

export const enum Schemas {
  User = "User",
  UserLogin = "UserLogin",
  Role = "Role"
}
export const contractor = new Contractor<Schemas>();
export type MyContractor = typeof contractor;
(async () => {
    await contractor.loadSchemas(__dirname + "/schemas")
    console.log(contractor.validator.schemas);
    const result = contractor.validate({ login: 'asd', password: "asd" }, Schemas.UserLogin);
    console.log(result.errors);
})()
