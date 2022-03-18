import * as fs from "fs";
import * as path from "path";

import Generator from "../interfaces/Generator";
import GeneratorBase from "./GeneratorBase";

class Routes extends GeneratorBase implements Generator {
  constructor() {
    super("Routes");
  }

  public generate(configGenerator: any) {
    this.generateRoute(configGenerator);
    this.updateRouteIndex(configGenerator);
  }

  public generateRoute(configGenerator: any) {
    configGenerator.modelPluralName = configGenerator.modelPluralName.toLowerCase();
    const template = this.getTemplate("Route.hbs");
    const content = template(configGenerator);
    const fileName = configGenerator.model + ".route.ts";
    const path = ["src", "modules", configGenerator.module, "routes"];
    this.writeFile(path, fileName, content);
  }

  public updateRouteIndex(configGenerator: any) {
    const pathFileIndex = path.join("..", "..", "..", "modules", configGenerator.module, "routes", "index.ts");
    const fileContent = fs.readFileSync(pathFileIndex, "utf-8");
    console.log({
      fileContent,
    });
  }
}

export default Routes;
