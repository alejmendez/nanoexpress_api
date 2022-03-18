import Generator from "../interfaces/Generator";
import GeneratorBase from "./GeneratorBase";

import Module from "./Module";
import Controller from "./Controller";
import Service from "./Service";
import Routes from "./Routes";
import Locales from "./Locales";
import Dto from "./Dto";
import Model from "./Model";
import Exceptions from "./Exceptions";

class All extends GeneratorBase implements Generator {
  constructor() {
    super("All");
  }

  public generate(configGenerator: any) {
    const arrGenerators = [
      new Module(),
      new Controller(),
      new Service(),
      new Routes(),
      new Locales(),
      new Dto(),
      new Model(),
      new Exceptions(),
    ];

    for (const generator of arrGenerators) {
      generator.generate(configGenerator);
    }
  }
}

export default All;
