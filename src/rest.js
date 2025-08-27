import cors from "cors";
import chalk from "chalk";
import express from "express";
import cookieParser from "cookie-parser";

import { errorHandler } from "./middleware/error-handler.js";
import { asyncHandler } from "./utilities/async-handler.js";

import taskRoutes from "./routes/tasks.routes.js";
import authRoutes from "./routes/auth.routes.js";
import workspaceRoutes from "./routes/workspace.routes.js";
import moduleRoutes from "./routes/module.routes.js"
import isWorkspaceOwner from "./middleware/isWorkspaceOwner.js";
import { protect } from "./middleware/authMiddleware.js";
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
app.use("/auth", authRoutes);
app.use("/workspaces",protect ,workspaceRoutes);
app.use("/workspaces/:workspace_id/modules", protect, moduleRoutes);

//task namespace
app.use("/workspaces/:workspace_id/modules/:module_id/tasks", protect, isWorkspaceOwner, taskRoutes);

// test
app.get(
  "/",
  asyncHandler((req, res) => {
    res.send("Hello World!");
  })
);

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
