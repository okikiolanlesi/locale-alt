import authRoutes from "./auth.routes";
import express from "express";
import regionRoutes from "./region.routes";
import stateRoutes from "./state.routes";
import LocalGovernmentAreaRoutes from "./local-government-area.routes";
import authMiddleware from "../../middlewares/auth.middleware";

const v1Routes = express.Router();

v1Routes.use("/auth", authRoutes);
v1Routes.use(authMiddleware.verifyToken);
v1Routes.use("/regions", regionRoutes);
v1Routes.use("/states", stateRoutes);
v1Routes.use("/lgas", LocalGovernmentAreaRoutes);

export default v1Routes;
