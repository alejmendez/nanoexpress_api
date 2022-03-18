export const configModule = {
  dirName: "modules",
  paths: {
    config: "config",
    controllers: "controllers",
    routes: "routes",
    locales: "locales",
  },
  registeredModules: [
    {
      name: "auth",
      description: "Module auth",
    },
    {
      name: "health",
      description: "Module health",
    },
    {
      name: "user",
      description: "Module user",
    },
  ],
};
