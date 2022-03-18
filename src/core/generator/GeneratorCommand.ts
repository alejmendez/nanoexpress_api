import { program } from "commander";
import inquirer from "inquirer";
import * as fs from "fs";

import { i18n, __ } from "@core/i18n";
import { config } from "@core/config";

import Generator from "./interfaces/Generator";
import {
  All,
  Module,
  Controller,
  Service,
  Routes,
  Locales,
  Dto,
  Model,
  Exceptions,
} from "./generators";


class GeneratorCommand {
  protected registeredGenerators: { [key: string]: Generator } = {};

  constructor() {
    this.registerGenerators();
    this.initConsole();
    // this.test();
  }

  async test() {
    const name = "Module";
    const configGenerator = this.getJsonFileContent("Person.json");
    const generatorSelected = this.registeredGenerators[name];
    await generatorSelected.generate(configGenerator);
  }

  registerGenerators() {
    this.registerGenerator(new All());
    this.registerGenerator(new Module());
    this.registerGenerator(new Controller());
    this.registerGenerator(new Service());
    this.registerGenerator(new Routes());
    this.registerGenerator(new Locales());
    this.registerGenerator(new Dto());
    this.registerGenerator(new Model());
    this.registerGenerator(new Exceptions());
  }

  registerGenerator(generator: Generator) {
    this.registeredGenerators[generator.getName()] = generator;
  }

  async initConsole() {
    try {
      await this.initI18n();
      this.initProgram();

      let generatorNameSelected = [];
      while (generatorNameSelected.length === 0) {
        generatorNameSelected = await this.promptAskGenerator();
      }

      const configurationFile = await this.promptAskConfigurationFile();
      const configGenerator = this.getJsonFileContent(configurationFile);

      const isAll = generatorNameSelected.find(
        (name: string) => name === "All"
      );

      if (isAll) {
        generatorNameSelected = ["All"];
      }

      for (const name of generatorNameSelected) {
        const generatorSelected = this.registeredGenerators[name];
        await generatorSelected.generate(configGenerator);
      }
    } catch (error) {
      console.log({ error });
    }
  }

  protected getJsonFileContent(configurationFile: any) {
    const dir = config("generator.directory");
    const file = fs.readFileSync(`${dir}/${configurationFile}`, "utf8");
    const json = JSON.parse(file);

    json.model = json.model.charAt(0).toUpperCase() + json.model.slice(1);
    json.modelLower = json.model.toLowerCase();

    return json;
  }

  protected async initI18n() {
    await i18n.loadTranslations(config("i18n.directory"));
  }

  protected initProgram() {
    program.version("0.0.1", "-v, --vers", "output the current version");
    program.parse(process.argv);
  }

  protected async promptAskConfigurationFile() {
    const folder = config("generator.directory");
    const files = await fs.promises.readdir(folder);

    let answer = await inquirer.prompt([
      {
        type: "list",
        name: "action",
        message: __("Select the configuration file to use") + ":",
        choices: files,
      },
    ]);
    const fileSelected = answer.action;
    return fileSelected;
  }

  protected async promptAskGenerator() {
    const allOptions: { [key: string]: string } = {
      [__("Generate All")]: "All",
      [__("Generate Module")]: "Module",
      [__("Generate Controller")]: "Controller",
      [__("Generate Service")]: "Service",
      [__("Generate Routes")]: "Routes",
      [__("Generate Locales")]: "Locales",
      [__("Generate Dto")]: "Dto",
      [__("Generate Model")]: "Model",
      [__("Generate Exceptions")]: "Exceptions",
    };
    const answer = await inquirer.prompt([
      {
        type: "checkbox",
        name: "action",
        message: __("What action do you want to run") + ":",
        choices: Object.keys(allOptions),
      },
    ]);
    const actionsSelected = answer.action;
    return actionsSelected.map((action: string) => allOptions[action]);
  }
}

new GeneratorCommand();
