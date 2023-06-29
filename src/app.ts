import cors from "cors";
import express from "express";
import morgan from "morgan";
import router from "./routes/index";
import globalErrorHandler, {
  handle404Error,
} from "./controllers/error.controller";
import config from "./config/env.config";

class Server {
  public app: express.Application;
  public port: number;
  private logger: any;

  constructor() {
    this.app = express();
    this.port = config.port;
    this.logger = morgan("dev");
    this.config();
  }

  private config() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(this.logger);
    this.app.use(router);
    this.app.use(handle404Error);
    this.app.use(globalErrorHandler);
  }

  public start() {
    this.app.listen(this.port, () => {
      console.log(`Server is listening on port ${this.port}`);
    });
  }
}

export default new Server();
