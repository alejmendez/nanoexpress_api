import { getRouter } from "../core/route";

import UserController from "../controllers/UserController";

const route = getRouter();

route.get("/api/v1/users", UserController.findAll);
route.post("/api/v1/users", UserController.create);
route.get("/api/v1/users/:userId", UserController.findOne);
route.put("/api/v1/users/:userId", UserController.update);
route.del("/api/v1/users/:userId", UserController.delete);