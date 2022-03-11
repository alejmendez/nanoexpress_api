export default [
  {
    method: "get",
    path: "/api/v1/version",
    handler: "HealthController@getVersion",
  },
];
