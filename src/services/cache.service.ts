import config from "../config/env.config";
import { createClient } from "redis";

class CacheService {
  client: any;
  constructor() {
    this.client = createClient({
      url: config.redisUrl,
    });
  }

  async connect() {
    await this.client.connect();

    this.client.on("connect", () => {
      console.log("Redis client connected");
    });

    this.client.on("error", (err) => {
      console.log("Unable to connect to redis " + err);
    });

    this.client.on("end", () => {
      console.log("Redis client disconnected");
    });
  }

  async disconnect() {
    await this.client.quit();
  }
}

export default CacheService;
