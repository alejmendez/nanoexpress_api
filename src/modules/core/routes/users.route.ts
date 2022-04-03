import {
  findAll,
  create,
  findOne,
  update,
  remove,
} from "../controllers/UserController";

export default [
  {
    group: "users",
    path: "/api/v1/users",
    routes: [
      {
        method: "get",
        path: "/",
        handler: findAll,
      },
      {
        method: "post",
        path: "/",
        handler: create,
      },
      {
        method: "get",
        path: "/:id",
        handler: findOne,
      },
      {
        method: "put",
        path: "/:id",
        handler: update,
      },
      {
        method: "del",
        path: "/:id",
        handler: remove,
      },
    ],
  },
];
