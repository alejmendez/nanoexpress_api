import { getVersion } from "../controllers/HealthController";

export default [
  {
    method: "get",
    path: "/api/v1/version",
    handler: getVersion,
  },
];
