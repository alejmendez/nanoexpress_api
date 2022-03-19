export default [
  {
    group: "users",
    path: "/api/v1/users",
    routes: [
      {
        method: "get",
        path: "/",
        handler: "UserController@findAll",
      },
      {
        method: "post",
        path: "/",
        handler: "UserController@create",
      },
      {
        method: "get",
        path: "/:id",
        handler: "UserController@findOne",
      },
      {
        method: "put",
        path: "/:id",
        handler: "UserController@update",
      },
      {
        method: "del",
        path: "/:id",
        handler: "UserController@remove",
      },
    ],
  },
];
