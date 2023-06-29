import mongoose from "mongoose";
import App from "./app";
import env from "./config/env.config";

mongoose
  .connect(env.databaseUrl)
  .then(() => {
    console.log("DB connection successful");
    App.start();
  })
  .catch((error) => {
    console.log("could not connect to MongoDB");
    console.log(error);
  });
