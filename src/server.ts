import { app } from "./app";
import { db } from "./database/db";
import LOGGER from "./lib/logger";

const PORT: any = process.env.APP_PORT || 3000;
db.sync();
app.listen(PORT);
LOGGER.debug(`Server running on http://localhost:${PORT}`);

process.on("SIGINT", () => {
  app.close();
  LOGGER.debug("app is down");
});
