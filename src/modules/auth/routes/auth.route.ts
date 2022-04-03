import { login, logout, getCurrentUser } from "../controllers/LoginController";

export default [
  {
    method: "post",
    path: "/api/v1/auth/login",
    handler: login,
  },
  {
    method: "post",
    path: "/api/v1/auth/logout",
    handler: logout,
  },
  {
    method: "get",
    path: "/api/v1/auth/current/user",
    handler: getCurrentUser,
  },
];
