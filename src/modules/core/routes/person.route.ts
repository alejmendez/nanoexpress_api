export default [
  {
    group: "people",
    path: "/api/v1/people",
    routes: [
      {
        method: "get",
        path: "/",
        handler: "PersonController@findAll",
      },
      {
        method: "post",
        path: "/",
        handler: "PersonController@create",
      },
      {
        method: "get",
        path: "/:id",
        handler: "PersonController@findOne",
      },
      {
        method: "put",
        path: "/:id",
        handler: "PersonController@update",
      },
      {
        method: "del",
        path: "/:id",
        handler: "PersonController@remove",
      },
    ],
  },
];
