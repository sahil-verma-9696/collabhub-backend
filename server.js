import express from "express";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import { connectDB } from "./config/database.js";
import { ROUTES } from "./routes/constants.js";
import { router as authRouter } from "./routes/auth.routes.js";
import { router as userRouter } from "./routes/user.routes.js";
import { router as teamRouter } from "./routes/team.routes.js";
import { logSuccess } from "./utils/logger.js";

config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(ROUTES.AUTH.BASE, authRouter);
app.use(ROUTES.USER.BASE, userRouter);
app.use(ROUTES.TEAM.BASE, teamRouter);
app.get("/", function (req, res) {
  res.send(
    `<h1 style="font-size:2 rem; position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);">Welcome to CollabHub Backend Home</h1>`
  );
});

async function startServer() {
  await connectDB();
  app.listen(PORT, function () {
    logSuccess(import.meta.url, `Server running on port ${PORT}`);
  });
}

startServer();
