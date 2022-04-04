import { addConfig } from "@core/config";
import { getI18n } from "@core/i18n";
import { getRouter } from "@core/route";
import configContent from "./config";
import routes from "./routes";

import { userService } from "./services/user.service";
import { personService } from "./services/person.service";

export default (): Array<Promise<any>> => {
  addConfig("auth", configContent);

  const route = getRouter();
  route.setConfig({
    controllersPath: "@modules/core/controllers/",
  });

  const promises = [
    getI18n().loadTranslations("@modules/core/locales"),
    route.init(routes),
    personService.initRepository(),
    userService.initRepository(),
  ];

  return promises;
};
