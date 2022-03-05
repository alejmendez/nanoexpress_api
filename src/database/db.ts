import { Sequelize } from "sequelize";

export const db = new Sequelize({
  dialect: "sqlite",
  storage: process.env.DB_STORAGE || "./nanodb.sqlite",
  logging: false,
});
