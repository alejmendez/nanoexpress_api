import { addConfig, config } from "./config";
import { getRouter } from "./route";
import { getI18n } from "./i18n";

class ModulesManager {
  protected modules: Array<any>;
  protected paths: any = {
    modules: "",
    config: "",
    controllers: "",
    routes: "",
    locales: "",
  };

  constructor() {
    this.paths.modules = config("module.dirName");
    this.paths.config = config("module.paths.config");
    this.paths.controllers = config("module.paths.controllers");
    this.paths.routes = config("module.paths.routes");
    this.paths.locales = config("module.paths.locales");

    this.modules = config("module.registeredModules");
  }

  async init() {
    const modulesPromises = [];
    for (const module of this.modules) {
      modulesPromises.push(this.loadConfig(module));
      modulesPromises.push(this.loadRouter(module));
      modulesPromises.push(this.loadI18n(module));
    }
    await Promise.all(modulesPromises);
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

    const route = getRouter();
    route.setConfig({
      controllersPath,
    });
    return route.init(routesContent);
  }

  protected async getRoutesFile(module: any) {
    const { name } = module;
    const routesPath = `@modules/${name}/${this.paths.routes}/`;
    const importedFile = await import(routesPath);
    return importedFile.default;
  }

  protected async loadI18n(module: any) {
    const { name } = module;

    const i18nPath = `../modules/${name}/${this.paths.locales}`;
    return getI18n().loadTranslations(i18nPath);
  }
}

let modulesManagerInstance: ModulesManager;
const getModulesManager = () => {
  if (!modulesManagerInstance) {
    modulesManagerInstance = new ModulesManager();
  }
  return modulesManagerInstance;
};

export { ModulesManager, getModulesManager };
