class ErrorConnectingToDatabase extends Error {
  constructor() {
    const message = "Error connecting to database";
    super(message);
  }
}

export default ErrorConnectingToDatabase;
