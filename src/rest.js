import cors from "cors";
import chalk from "chalk";
import express from "express";
import cookieParser from "cookie-parser";

import { errorHandler } from "./middleware/error-handler.js";
import { asyncHandler } from "./utilities/async-handler.js";


import taskRoutes from "./routes/tasks.routes.js";

const app = express();

// TODO : enable cors
app.use(
  cors({
    origin: "*", // frontend origin
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// define all the entry routes here(i.e. /auth, /admin , /user , /workspace etc.)
// app.use("/auth", authRoutes);

// test
app.get(
  "/",
  asyncHandler((req, res) => {
    res.send("Hello World!");
  })
);

//task namespace
app.use("/task", taskRoutes);

// setup error handler
app.use(errorHandler);

/**
 * Starts the application server on the specified port.
 *
 * @param {number} port - The port number to listen on.
 * @returns {import("http").Server} - The HTTP server instance.
 */
function listen(port) {
  const HOST = "localhost"; 
  return app.listen(port, () => {
    console.log(
      chalk.gray(`App is listening on the `) +
        chalk.green.bold.underline(`http://${HOST}:${port}`)
    );
  });
}

export { listen };
