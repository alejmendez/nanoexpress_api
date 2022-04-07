import dotenv from "dotenv";
import { get } from "lodash";

let path = `${__dirname}/../../.env`;
if (process.env.NODE_ENV === "test") {
  path = `${__dirname}/../../.test.env`;
}

dotenv.config({
  path,
});

import { generalConfig } from "../config";

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
