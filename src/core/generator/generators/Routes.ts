import * as fs from "fs";
import * as path from "path";

import Generator from "../interfaces/Generator";
import GeneratorBase from "./GeneratorBase";

export default class Routes extends GeneratorBase implements Generator {
  constructor() {
    super("Routes");
  }

  public generate(configGenerator: any) {
    this.generateRoute(configGenerator);
    this.updateRouteIndex(configGenerator);
  }

  public generateRoute(configGenerator: any) {
    const model = configGenerator.model.toLowerCase();

    configGenerator.modelPluralName =
      configGenerator.modelPluralName.toLowerCase();
    const template = this.getTemplate("Route.hbs");
    const content = template(configGenerator);
    const fileName = model + ".route.ts";
    const path = ["src", "modules", configGenerator.module, "routes"];
    this.writeFile(path, fileName, content);
  }

  public updateRouteIndex(configGenerator: any) {
    const nameFileIndex = "index.ts";
    const pathFileIndex = [
      __dirname,
      "..",
      "..",
      "..",
      "modules",
      configGenerator.module,
      "routes",
    ];

    const fileIndex = path.join(...pathFileIndex, nameFileIndex);
    const fileContent = fs.readFileSync(fileIndex, "utf-8");

    const model = configGenerator.model.toLowerCase();

    const contentFilter = fileContent
      .split("\n")
      .map((line) => {
        const match = line.match(/import\s+(\w+)\s+from\s+"([\w\.\/]+)"/);
        if (match) {
          const [line, routeName] = match;
          if (routeName === `${model}Routes`) {
            return false;
          }
          return [line, routeName];
        }
        return false;
      })
      .filter((line) => line !== false);

    const lines = contentFilter.map((line: any) => line[0]);
    const routesNamesCurrents = contentFilter.map((line: any) => line[1]);
    routesNamesCurrents.push(`${model}Routes`);
    let exportDefault = routesNamesCurrents
      .map((route: any) => "..." + route)
      .join(", ");

    let newContent = lines.join("\n");
    newContent += `\nimport ${model}Routes from "./${model}.route";`;
    newContent += `\n\nexport default [${exportDefault}];\n`;

    this.writeFile(pathFileIndex, nameFileIndex, newContent);
  }
}
