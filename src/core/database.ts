import { createConnection, Connection } from "typeorm";
import ErrorConnectingToDatabase from "../exceptions/ErrorConnectingToDatabase";
import LOGGER from "../lib/logger";
import Benchmark from "./benchmark";
import { config } from "./config";

let connection: Connection;
const initConnection = async () => {
  try {
    Benchmark.start();
    connection = await createConnection(config("database"));
    if (connection === undefined) {
      throw new ErrorConnectingToDatabase();
    }
    LOGGER.info(`Connection to database established [${Benchmark.end()}]`);

    Benchmark.start();
    await connection.synchronize();
    LOGGER.info(`Database synchronized [${Benchmark.end()}]`);

    return connection;
  } catch (error) {
    LOGGER.error(error);
  }
};

const getDbConnection = () => {
  return connection;
};

export { initConnection, getDbConnection };
