import nanoexpress, { INanoexpressApp } from "nanoexpress";
import { getNano } from "./nanoexpress";

class Router {
  protected app: nanoexpress.INanoexpressApp;
  protected listRoutes: Array<any>;

  constructor() {
    this.app = getNano();
    this.listRoutes = [];
  }

  public addToListRoute(method: string, path: string, ...params: any) {
    this.listRoutes.push([method, path, ...params]);
  }

  public getListRoutes() {
    return this.listRoutes;
  }

  public init() {
    return this.listRoutes.map(([method, path, ...params]) => {
      switch (method) {
        case "get":
          this.app.get(path, ...params);
          break;
        case "post":
          this.app.post(path, ...params);
          break;
        case "put":
          this.app.put(path, ...params);
          break;
        case "patch":
          this.app.patch(path, ...params);
          break;
        case "del":
          this.app.del(path, ...params);
          break;
        case "options":
          this.app.options(path, ...params);
          break;
        case "any":
          this.app.any(path, ...params);
          break;
      }
    });
  }

  public get(path: string, ...params: any): INanoexpressApp {
    this.addToListRoute("get", path, ...params);
    return this.app.get(path, ...params);
  }

  public post(path: string, ...params: any) {
    this.addToListRoute("post", path, ...params);
  }

  public put(path: string, ...params: any) {
    this.addToListRoute("put", path, ...params);
  }

  public patch(path: string, ...params: any) {
    this.addToListRoute("patch", path, ...params);
  }

  public del(path: string, ...params: any) {
    this.addToListRoute("del", path, ...params);
  }

  public options(path: string, ...params: any) {
    this.addToListRoute("options", path, ...params);
  }

  public any(path: string, ...params: any) {
    this.addToListRoute("any", path, ...params);
  }
}

const routeInstance = new Router();
const getRouter = () => routeInstance;

export { getRouter };
