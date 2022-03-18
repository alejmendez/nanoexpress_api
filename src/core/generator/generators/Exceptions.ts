import Generator from "../interfaces/Generator";
import GeneratorBase from "./GeneratorBase";

class Exceptions extends GeneratorBase implements Generator {
  constructor() {
    super("Exceptions");
  }

  public generate(configGenerator: any) {
    const template = this.getTemplate("Exceptions.hbs");
    const content = template(configGenerator);
    const fileName = configGenerator.model + "NotFound.ts";
    const path = ["src", "modules", configGenerator.module, "exceptions"];
    this.writeFile(path, fileName, content);
  }
}

export default Exceptions;
