import LOGGER from "../lib/logger";
import { config } from "./config";
import { Router } from "./route";

class modules {
  protected modules: Array<any>;
  protected paths: any = {
    modules: "",
    config: "",
    controllers: "",
    routes: "",
  };

  constructor() {}

  async init() {
    this.paths.modules = config("module.dirName");
    this.paths.config = config("module.paths.config");
    this.paths.controllers = config("module.paths.controllers");
    this.paths.routes = config("module.paths.routes");
    await this.readModulesJson();

    await Promise.all(
      this.modules.map(async (module: any) => {
        await this.loadModuleRouter(module);
      })
    );
  }

  protected async readModulesJson() {
    const fileModules = config("module.fileModules");
    const importedFile = await import(
      `../${this.paths.modules}/${fileModules}`
    );
    this.modules = importedFile.default;
  }

  protected async loadModuleRouter(module: any) {
    const { name } = module;
    const listRoutes = await this.getRoutesFile(module);
    const controllersPath = `../${this.paths.modules}/${name}/${this.paths.controllers}/`;
    const route = new Router({
      controllersPath,
    });
    LOGGER.info(`Registering routes for the ${name} module...`);
    await route.init(listRoutes);
    route.initMessage();
  }

  protected async getRoutesFile(module: any) {
    const { name } = module;
    const routesPath = `../${this.paths.modules}/${name}/${this.paths.routes}/`;
    const importedFile = await import(routesPath);
    return importedFile.default;
  }
}

export default modules;
