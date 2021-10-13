import { Schema, Validator } from "jsonschema";
import fs from 'fs/promises';

export class Contractor<Schemas> {
  validator: Validator;
  private schemasRegistered: {[key: string]: Schema} = {};

  constructor() {
    this.validator = new Validator();
  }

  async loadSchemas(folder: string) {
    const files = await fs.readdir(folder);

    // List of schemas files
    const schemasFiles = files.filter(name => {
      return name.endsWith(".js")
    }).map(file => `${folder}/${file}`);

    // Load schemas with receive contractor object 
    schemasFiles.forEach(schemaFile => {
      require(schemaFile).default(this)
    })
  }

  addSchema(id: Schemas, schema: Schema): this {
    if (this.schemasRegistered[id + ''] !== undefined) {
      throw new Error(`Schema with name '${id}' already added`);
    }

    this.schemasRegistered[id + ''] = schema;
    this.validator.addSchema({ id: id + '', ...schema});

    return this;
  }

  getSchema(id: Schemas): Schema | undefined {
    return this.schemasRegistered[id + ''];
  }

  validate(data: any, id: Schemas) {
    const schema = this.getSchema(id);
    if (!schema) throw new Error(`Schema with id '${id}' not found`);
    return this.validator.validate(data, schema)
  }
}

export function projection<T extends string, U = { [key in T]: { $ref: string } }>(
  id: string,
  fields: T[]
): U {
  const result: any = {};

  fields.forEach((field) => {
    result[field] = { $ref: `/${id}#/properties/${field}` };
  });

  return result;
}

export function projection2<
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