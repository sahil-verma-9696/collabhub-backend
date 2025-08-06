import * as wsApi from "./socket/index.js";
import * as restApi from "./rest.js";

async function bootstrap() {
  try {
    const port = 8000;
    const httpServer = restApi.listen(port);
    wsApi.listen(httpServer);
  } catch (err) {
    console.log(chalk.red("App Bootstrap Error: ", err));
  }
}

bootstrap();