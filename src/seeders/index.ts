import mongoose from "mongoose";
import dotenv from "dotenv";
import LocalGovernmentAreaSeeder from "./local-government-area.seeder";
import RegionSeeder from "./region.seeder";
import StateSeeder from "./state.seeder";
import { connect } from "http2";

dotenv.config();

mongoose
  .connect(process.env.DATABASE_URL as string)
  .then(() => {
    console.log("connected to db");

    const seeders = [
      // new RegionSeeder(),
      // new StateSeeder(),
      new LocalGovernmentAreaSeeder(),
    ];
    const queries = seeders.map((seeder) => seeder.seed());

    Promise.all(queries).then((results) => {
      results.forEach((result) => console.log(result));
      process.exit(0);
    });
  })
  .catch((err) => console.log(err));
