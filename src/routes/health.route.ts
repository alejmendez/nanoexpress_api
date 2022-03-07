import { getRouter } from "../core/route";
import { getVersion } from "../controllers/HealthController";

const route = getRouter();
route.get("/api/v1/version", getVersion);
