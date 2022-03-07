import { getRouter } from "../core/route";

import { login } from "../controllers/LoginController";
import { logout } from "../controllers/LogoutController";

const route = getRouter();
route.post("/api/v1/auth/login", login);
route.post("/api/v1/auth/logout", logout);
