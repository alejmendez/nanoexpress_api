import health from "./health.route";
import auth from "./auth.route";
import users from "./users.route";

export default [...health, ...auth, ...users];
