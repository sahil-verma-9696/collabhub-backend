import * as wsApi from "./socket/index.js";
import * as restApi from "./rest.js";
import connectDB from "./database/connection.js";

async function bootstrap() {
  try {
    const PORT = 8000;
    const DATABASE_NAME = "collabhub";
    
    await connectDB(DATABASE_NAME);

    const httpServer = restApi.listen(PORT);

    wsApi.listen(httpServer);
  } catch (err) {
    console.log(chalk.red("App Bootstrap Error: ", err));
  }
}

bootstrap();
