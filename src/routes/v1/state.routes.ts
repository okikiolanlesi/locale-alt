import stateController from "../../controllers/state.controller";
import express from "express";

const stateRoutes = express.Router();

stateRoutes.get("/", stateController.getAll);
stateRoutes.get("/:id", stateController.getOne);

export default stateRoutes;
