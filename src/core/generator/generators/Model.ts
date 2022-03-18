import { snakeCase } from "lodash";
import Generator from "../interfaces/Generator";
import GeneratorBase from "./GeneratorBase";

class Model extends GeneratorBase implements Generator {
  constructor() {
    super("Model");
  }

  public generate(configGenerator: any) {
    for (const field of configGenerator.fields) {
      if (field.type_db === "id") {
        field.decorator = '@PrimaryGeneratedColumn("uuid")';
        continue;
      }

      const variant = field.type_db.toLowerCase();
      let options = {};

      if (field.length) {
        options = {
          ...options,
          length: field.length,
        };
      }

      if (field.nullable) {
        options = {
          ...options,
          nullable: true,
        };
      }

      if (field.default) {
        options = {
          ...options,
          default: field.default,
        };
      }

      const optionsStr = JSON.stringify(options);

      field.decorator = `@Column("${variant}", ${optionsStr})`;
      if (optionsStr === '{}') {
        field.decorator = `@Column("${variant}")`;
      }

      field.name = snakeCase(field.name);
    }

    const template = this.getTemplate("Model.hbs");
    const content = template(configGenerator);
    const fileName = configGenerator.modelLower + ".entity.ts";
    const path = ["src", "modules", configGenerator.module, "entities"];
    this.writeFile(path, fileName, content);
  }
}

export default Model;
