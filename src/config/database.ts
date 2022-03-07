export const configDatabase = {
  driver: process.env["DB_CONNECTION"] || "mysql",
  host: process.env["DB_HOST"] || "127.0.0.1",
  port: process.env["DB_PORT"] || "3306",
  database: process.env["DB_DATABASE"] || "database",
  username: process.env["DB_USERNAME"] || "root",
  password: process.env["DB_PASSWORD"] || "root",
  storage: process.env["DB_STORAGE"] || "./nanodb.sqlite",
};
