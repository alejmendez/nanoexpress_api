export default [
  {
    method: "post",
    path: "/api/v1/auth/login",
    handler: "LoginController@login",
  },
  {
    method: "post",
    path: "/api/v1/auth/logout",
    handler: "LoginController@logout",
  },
  {
    method: "get",
    path: "/api/v1/auth/current/user",
    handler: "LoginController@getCurrentUser",
  },
];
