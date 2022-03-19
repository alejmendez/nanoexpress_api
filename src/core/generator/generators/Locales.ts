import Generator from "../interfaces/Generator";
import GeneratorBase from "./GeneratorBase";

export default class Locales extends GeneratorBase implements Generator {
  constructor() {
    super("Locales");
  }

  public generate(configGenerator: any) {
    this.es(configGenerator);
    this.en(configGenerator);
  }

  public es(configGenerator: any) {
    const template = this.getTemplate(["locales", "es.hbs"]);
    const content = template(configGenerator);
    const fileName = "es.json";
    const path = ["src", "modules", configGenerator.module, "locales"];
    this.writeFile(path, fileName, content);
  }
  public en(configGenerator: any) {
    const template = this.getTemplate(["locales", "en.hbs"]);
    const content = template(configGenerator);
    const fileName = "en.json";
    const path = ["src", "modules", configGenerator.module, "locales"];
    this.writeFile(path, fileName, content);
  }
}
