import Generator from "../interfaces/Generator";
import GeneratorBase from "./GeneratorBase";

export default class Controller extends GeneratorBase implements Generator {
  constructor() {
    super("Controller");
  }

  public generate(configGenerator: any) {
    const template = this.getTemplate("Controller.hbs");
    const content = template(configGenerator);
    const fileName = configGenerator.model + "Controller.ts";
    const path = ["src", "modules", configGenerator.module, "controllers"];
    this.writeFile(path, fileName, content);
  }
}
