import Generator from "../interfaces/Generator";
import GeneratorBase from "./GeneratorBase";

class Dto extends GeneratorBase implements Generator {
  constructor() {
    super("Dto");
  }

  public generate(configGenerator: any) {
    this.dtoRequest(configGenerator);
    this.dtoResponse(configGenerator);
  }

  public dtoRequest(configGenerator: any) {
    const template = this.getTemplate("dtoRequest.hbs");
    const content = template(configGenerator);
    const fileName = configGenerator.model + "Request.dto.ts";
    const path = ["src", "modules", configGenerator.module, "dto"];
    this.writeFile(path, fileName, content);
  }

  public dtoResponse(configGenerator: any) {
    const template = this.getTemplate("dtoResponse.hbs");
    const content = template(configGenerator);
    const fileName = configGenerator.model + "Response.dto.ts";
    const path = ["src", "modules", configGenerator.module, "dto"];
    this.writeFile(path, fileName, content);
  }
}

export default Dto;
