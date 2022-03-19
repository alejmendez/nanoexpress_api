import LOGGER from "./logger";
import Benchmark from "./benchmark";
import { addConfig, config } from "./config";
import { Router } from "./route";
import { i18n } from "./i18n";

export default class modules {
  protected modules: Array<any>;
  protected paths: any = {
    modules: "",
    config: "",
    controllers: "",
    routes: "",
    locales: "",
  };

  constructor() {}

  async init() {
    this.paths.modules = config("module.dirName");
    this.paths.config = config("module.paths.config");
    this.paths.controllers = config("module.paths.controllers");
    this.paths.routes = config("module.paths.routes");
    this.paths.locales = config("module.paths.locales");

    this.modules = config("module.registeredModules");

    for (const module of this.modules) {
      Benchmark.start();
      this.loadModule(module);
      LOGGER.info(`Initialized ${module.name} module [${Benchmark.end()}]`);
    }
  }

  protected async loadModule(module: any) {
    await this.loadConfig(module);
    await this.loadRouter(module);
    await this.loadI18n(module);
  }

  protected async loadConfig(module: any) {
    const configContent = await this.getConfigFile(module);
    addConfig(module.name, configContent);
  }

  protected async getConfigFile(module: any) {
    const { name } = module;
    const routesPath = `@modules/${name}/${this.paths.config}/`;
    const importedFile = await import(routesPath);
    return importedFile.default;
  }

  protected async loadRouter(module: any) {
    const { name } = module;
    const routesContent = await this.getRoutesFile(module);
    const controllersPath = `@modules/${name}/${this.paths.controllers}/`;
    const route = new Router({
      controllersPath,
    });
    await route.init(routesContent);
  }

  protected async getRoutesFile(module: any) {
    const { name } = module;
    const routesPath = `@modules/${name}/${this.paths.routes}/`;
    const importedFile = await import(routesPath);
    return importedFile.default;
  }

  protected async loadI18n(module: any) {
    const { name } = module;
    const i18nPath = `@modules/${name}/${this.paths.locales}`;
    await i18n.loadTranslations(i18nPath);
  }
}
