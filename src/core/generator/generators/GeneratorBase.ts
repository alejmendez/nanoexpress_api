import * as fs from "fs";
import * as path from "path";
import Handlebars from "handlebars";

import Generator from "../interfaces/Generator";

export default class GeneratorBase implements Generator {
  protected name: string;
  constructor(name: string) {
    this.name = name;
  }
  public getName() {
    return this.name;
  }

  public generate(_: any) {}

  protected getTemplate(
    fileName: string | Array<string>
  ): Handlebars.TemplateDelegate {
    let source = this.getFileContent(fileName);
    return Handlebars.compile(source);
  }

  protected getFileContent(
    fileName: string | Array<string>,
    path: Array<string> = []
  ): string {
    path = path.length > 0 ? path : [__dirname, "templates"];
    if (!Array.isArray(fileName)) {
      fileName = [fileName];
    }
    const filePath = path.join(...path, ...fileName);
    return fs.readFileSync(filePath, "utf-8");
  }

  protected writeFile(
    pathDestination: Array<string>,
    fileName: string,
    content: string
  ) {
    const filePathDir = path.join(...pathDestination);
    fs.mkdirSync(filePathDir, { recursive: true });
    const filePath = path.join(...pathDestination, fileName);
    return fs.writeFileSync(filePath, content);
  }
}
