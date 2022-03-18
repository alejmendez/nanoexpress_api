import { config } from "@core/config";
import Generator from "../interfaces/Generator";
import GeneratorBase from "./GeneratorBase";

class Module extends GeneratorBase implements Generator {
  constructor() {
    super("Module");
  }

  public generate(configGenerator: any) {
    const configModule = config("module");

    const existModule = configModule.registeredModules.find(
      (module: any) => module.name === configGenerator.module
    );

    if (!existModule) {
      configModule.registeredModules.push({
        name: configGenerator.module,
        description: "Module " + configGenerator.module,
      });
    }

    const template = this.getTemplate("Module.hbs");
    const content = template({
      configModule: JSON.stringify(configModule, null, 2),
    });
    const fileName = "module.ts";
    const path = ["src", "config"];
    this.writeFile(path, fileName, content);
  }
}

export default Module;
