import stateController from "../../controllers/state.controller";
import express from "express";

const stateRoutes = express.Router();

stateRoutes.get("/", stateController.getAll);

export default stateRoutes;
