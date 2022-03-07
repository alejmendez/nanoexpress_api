import { generalConfig } from "../config";
import { get } from "lodash";

const config = (key: string, defaultValue: any = ""): any => {
  return get(generalConfig, key, defaultValue);
};

export { config };
