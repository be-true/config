import { Contractor } from "./contractor";

export const enum Schemas {
    User = "User",
    UserLogin = "UserLogin",
}
export type MyContractor = Contractor<Schemas>;
export const contractor = new Contractor<Schemas>();
(async () => {
    await contractor.loadSchemas(__dirname + "/schemas")
    console.log(contractor.validator.schemas);
    const result = contractor.validate({ login: 'asd', password: "asd" }, Schemas.UserLogin);
    console.log(result.errors);
})()
