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
route.get("/api/v1/users/:id", findOne);
route.put("/api/v1/users/:id", update);
route.del("/api/v1/users/:id", remove);
