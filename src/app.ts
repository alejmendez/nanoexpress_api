import nanoexpress from "nanoexpress";
import jwt from "./middlewares/authenticate";
import UserController from "./controllers/UserController";
import LoginController from "./controllers/LoginController";
import LogoutController from "./controllers/LogoutController";
import ApiVersionController from "./controllers/ApiVersionController";

/**
 * Criate nanoexpress app
 */
export const app: nanoexpress.INanoexpressApp = nanoexpress();

/**
 * Enpoints of application
 */

// api version endpoint
app.get("/api/v1/version", ApiVersionController.getVersion);

// login enpoints
app.post("/api/v1/auth/login", LoginController.login);
app.post("/api/v1/auth/logout", LogoutController.logout);

// users endpoints
app.use(jwt);
app.get("/api/v1/users", UserController.findAll);
app.post("/api/v1/users", UserController.create);
app.get("/api/v1/users/:userId", UserController.findOne);
app.put("/api/v1/users/:userId", UserController.update);
app.del("/api/v1/users/:userId", UserController.delete);
