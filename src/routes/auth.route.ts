import { getRouter } from "../core/route";

import LoginController from "../controllers/LoginController";
import LogoutController from "../controllers/LogoutController";

const route = getRouter();
route.post("/api/v1/auth/login", LoginController.login);
route.post("/api/v1/auth/logout", LogoutController.logout);