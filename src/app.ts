import cors from "cors";
import express from "express";
import morgan from "morgan";
import router from "./routes/index";
import globalErrorHandler, {
  handle404Error,
} from "./controllers/error.controller";
import config from "./config/env.config";
import CacheService from "./services/cache.service";

class Server {
  public app: express.Application;
  public port: number;
  private logger: any;
  private redis: CacheService;

  constructor() {
    this.app = express();
    this.port = config.port;
    this.logger = morgan("dev");
    this.redis = new CacheService();
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
      this.redis.connect().then(() => {
        console.log("Redis connected");
      });
    });
  }
}

export default new Server();
