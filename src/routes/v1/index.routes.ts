import authRoutes from "./auth.routes";
import express from "express";

const v1Routes = express.Router();

v1Routes.use("/auth", authRoutes);

export default v1Routes;
