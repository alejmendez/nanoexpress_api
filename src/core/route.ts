import nanoexpress, { INanoexpressApp } from "nanoexpress";
import { getNano } from "./nanoexpress";

class Router {
  protected app: nanoexpress.INanoexpressApp;
  protected listRoutes: Array<any>;

  constructor() {
    this.app = getNano();
    this.listRoutes = [];
  }

  public addToListRoute(method: string, path: string) {
    this.listRoutes.push([method, path]);
  }

  public getListRoutes() {
    return this.listRoutes;
  }

  public get(path: string, ...params: any): INanoexpressApp {
    this.addToListRoute("get", path);
    return this.app.get(path, ...params);
  }

  public post(path: string, ...params: any): INanoexpressApp {
    this.addToListRoute("post", path);
    return this.app.post(path, ...params);
  }

  public put(path: string, ...params: any): INanoexpressApp {
    this.addToListRoute("put", path);
    return this.app.put(path, ...params);
  }

  public patch(path: string, ...params: any): INanoexpressApp {
    this.addToListRoute("patch", path);
    return this.app.patch(path, ...params);
  }

  public del(path: string, ...params: any): INanoexpressApp {
    this.addToListRoute("del", path);
    return this.app.del(path, ...params);
  }

  public options(path: string, ...params: any): INanoexpressApp {
    this.addToListRoute("options", path);
    return this.app.options(path, ...params);
  }

  public any(path: string, ...params: any): INanoexpressApp {
    this.addToListRoute("any", path);
    return this.app.any(path, ...params);
  }
}

const routeInstance = new Router();
const getRouter = () => routeInstance;

export { getRouter };
