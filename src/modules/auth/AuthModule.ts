import { addConfig } from "@core/config";
import { getI18n } from "@core/i18n";
import { getRouter } from "@core/route";
import configContent from "./config";
import routes from "./routes";

export default (): Array<Promise<any>> => {
  addConfig("auth", configContent);

  const route = getRouter();
  route.setConfig({
    controllersPath: "@modules/auth/controllers/",
  });

  const promises = [
    getI18n().loadTranslations("@modules/auth/locales"),
    route.init(routes),
  ];

  return promises;
};
