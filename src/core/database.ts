import Benchmark from "./benchmark";
import { createConnection, Connection } from "typeorm";
import ErrorConnectingToDatabase from "@exceptions/ErrorConnectingToDatabase";
import LOGGER from "./logger";
import { config } from "./config";

let conn: Connection;
let connectionInitialized = false;
const initConnection = async () => {
  if (connectionInitialized) {
    return conn;
  }

  try {
    Benchmark.start();
    conn = await createConnection(config("database"));
    if (conn === undefined) {
      throw new ErrorConnectingToDatabase();
    }
    connectionInitialized = true;

    LOGGER.info(`Connection to database established [${Benchmark.end()}]`);

    Benchmark.start();
    await conn.synchronize();
    LOGGER.info(`Database synchronized [${Benchmark.end()}]`);
  } catch (error) {
    LOGGER.error(error);
  }

  return conn;
};

const getDbConnection = async () => {
  return await initConnection();
};

export { initConnection, getDbConnection };
