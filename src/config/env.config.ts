import dotenv from "dotenv";

dotenv.config();

interface IConfig {
  nodeEnv: string;
  databaseUrl: string;
  port: number;
  emailFrom?: string;
  emailHost?: string;
  emailPort?: number;
  emailUsername?: string;
  emailPassword?: string;
  gmailUsername?: string;
  gmailPassword?: string;
}

const env = process.env;

const config: IConfig = {
  databaseUrl: env.DATABASE_URL || "mongodb://localhost:27017",
  nodeEnv: env.NODE_ENV || "development",
  port: env.PORT ? parseInt(env.PORT) : 8000,
};

export default config;
