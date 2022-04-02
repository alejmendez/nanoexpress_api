import userRoutes from "./users.route";
import healthRoutes from "./health.route";
import personRoutes from "./person.route";

export default [...userRoutes, ...healthRoutes, ...personRoutes];
