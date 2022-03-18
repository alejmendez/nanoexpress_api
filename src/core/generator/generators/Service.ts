import Generator from "../interfaces/Generator";
import GeneratorBase from "./GeneratorBase";

class Service extends GeneratorBase implements Generator {
  constructor() {
    super("Service");
  }

  public generate(configGenerator: any) {
    configGenerator.searchableColumns = configGenerator.fields.map(
      (field: any) => field.name
    );
    configGenerator.sortableColumns = configGenerator.searchableColumns.filter(
      (field: any) => field !== "id"
    );
    configGenerator.defaultSortBy = [
      [configGenerator.searchableColumns[0], "DESC"],
    ];

    configGenerator.searchableColumns = JSON.stringify(
      configGenerator.searchableColumns
    );
    configGenerator.sortableColumns = JSON.stringify(
      configGenerator.sortableColumns
    );
    configGenerator.defaultSortBy = JSON.stringify(
      configGenerator.defaultSortBy
    );

    const template = this.getTemplate("Service.hbs");
    const content = template(configGenerator);
    const fileName = configGenerator.modelLower + ".service.ts";
    const path = ["src", "modules", configGenerator.module, "services"];
    this.writeFile(path, fileName, content);
  }
}

export default Service;
