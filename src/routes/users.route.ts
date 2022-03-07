import { getRouter } from "../core/route";

import {
  findAll,
  create,
  findOne,
  update,
  remove,
} from "../controllers/UserController";

const route = getRouter();

route.get("/api/v1/users", findAll);
route.post("/api/v1/users", create);
route.get("/api/v1/users/:userId", findOne);
route.put("/api/v1/users/:userId", update);
route.del("/api/v1/users/:userId", remove);
