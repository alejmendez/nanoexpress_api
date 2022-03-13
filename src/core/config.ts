import { generalConfig } from "../config";
import { get } from "lodash";

const globalConfig: any = {
  ...generalConfig,
};

const config = (key: string, defaultValue: any = ""): any => {
  return get(globalConfig, key, defaultValue);
};

const addConfig = (key: string, config: any): any => {
  globalConfig[key] = config;
};

export { config, addConfig };
