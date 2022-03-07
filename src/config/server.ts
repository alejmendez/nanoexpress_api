export const configServer = {
  url: process.env["APP_URL"] || "http://localhost",
  port: process.env["APP_PORT"] || 3000,
  version: process.env["APP_VERSION"] || "0.0.0",
};
