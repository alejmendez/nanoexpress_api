export const configDatabase = {
  type: process.env["DB_CONNECTION"] ?? "mysql",
  host: process.env["DB_HOST"] ?? "127.0.0.1",
  port: process.env["DB_PORT"] ?? 3306,
  username: process.env["DB_USERNAME"] ?? "root",
  password: process.env["DB_PASSWORD"] ?? "root",
  database: process.env["DB_DATABASE"] ?? "database",
  synchronize: process.env["DB_SYNCHRONIZE"] ?? true,
  logging: false,
  logger: "file",
  storage: process.env["DB_STORAGE"] ?? "./nanodb.sqlite",

  entities: ["src/**/entities/*.ts"],
  migrations: ["src/database/migrations/**/*.ts"],
  subscribers: ["src/subscribers/**/*.ts"],
  cli: {
    entitiesDir: "src/entities",
    migrationsDir: "src/database/migrations",
    subscribersDir: "src/subscribers",
  },
};
