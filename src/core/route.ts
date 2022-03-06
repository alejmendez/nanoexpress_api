import nanoexpress, { INanoexpressApp } from "nanoexpress";
import { getNano } from "./nanoexpress";

class Router {
  protected app: nanoexpress.INanoexpressApp;
  constructor() {
    this.app = getNano();
  }

  public get(path: string, ...params: any): INanoexpressApp {
    return this.app.get(path, ...params);
  }

  public post(path: string, ...params: any): INanoexpressApp {
    return this.app.post(path, ...params);
  }

  public put(path: string, ...params: any): INanoexpressApp {
    return this.app.put(path, ...params);
  }

  public patch(path: string, ...params: any): INanoexpressApp {
    return this.app.patch(path, ...params);
  }

  public del(path: string, ...params: any): INanoexpressApp {
    return this.app.del(path, ...params);
  }

  public options(path: string, ...params: any): INanoexpressApp {
    return this.app.options(path, ...params);
  }

  public any(path: string, ...params: any): INanoexpressApp {
    return this.app.any(path, ...params);
  }
}

const routeInstance = new Router();
const getRouter = () => routeInstance;

export { getRouter };
