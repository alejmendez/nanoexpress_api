import { getRouter } from "../core/route";
import ApiVersionController from "../controllers/ApiVersionController";

getRouter().get("/api/v1/version", ApiVersionController.getVersion);

import "./auth.route";
import "./users.route";

