import winston, { transports } from "winston";
import { config } from "@core/config";

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "white",
};

winston.addColors(colors);

const format: winston.Logform.Format = winston.format.combine(
  winston.format.timestamp({ format: "DD-MM-YYYY HH:mm:ss" }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info: winston.Logform.TransformableInfo) =>
      `${info.timestamp} ${info.level}: ${info.message}`
  )
);

const myLogTransports = [];

if (process.env.NODE_ENV == "production") {
  myLogTransports.push(
    new winston.transports.File({ filename: "somefile.log" })
  );
} else {
  myLogTransports.push(new transports.Console({ level: "error" }));
}

const LOGGER: winston.Logger = winston.createLogger({
  level: config("logger.level"),
  levels,
  format,
  transports: myLogTransports,
});

export default LOGGER;
