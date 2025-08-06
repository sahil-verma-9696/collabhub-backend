import chalk from "chalk";

// Determine if environment is development
const isDev = process.env.NODE_ENV !== "production";

// Centralized error handler middleware
export function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  const errorMessage = err.message || "Internal Server Error";

  // Log error nicely in dev
  if (isDev) {
    console.log(
      chalk.blueBright(
        `[${
          isDev ? new Date().toLocaleTimeString() : new Date().toISOString()
        }] ${req.method} ${req.originalUrl}`
      )
    );
    console.error(chalk.redBright(err.stack));
  } else {
    // In production, log minimal error to console or external service (e.g., Sentry)
    console.error(
      `[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`
    );
    console.error(`Error: ${errorMessage}`);
  }

  // Build response object
  const response = {
    message: isDev
      ? errorMessage
      : "Something went wrong. Please try again later.",
    payload: null,
  };

  // Optionally include stack trace in development
  if (isDev && err.stack) {
    response["Error Type : "] = err.stack.split("\n")[0];
    response["Stack Trace top "] = err.stack.split("\n")[1].trim();
  }

  res.status(statusCode).json(response);
}
