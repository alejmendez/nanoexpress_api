import { createConnection, Connection } from "typeorm";
import LOGGER from "../lib/logger";
import { config } from "./config";

let connection: Connection;
const initConnection = async () => {
  try {
    connection = await createConnection(config("database"));
    if (connection === undefined) {
      throw new Error("Error connecting to database");
    }

    LOGGER.info("Connection to database established");
    connection.synchronize();

    return connection;
  } catch (error) {
    LOGGER.error(error);
  }
};

const getDbConnection = () => {
  return connection;
};

export { initConnection, getDbConnection };
