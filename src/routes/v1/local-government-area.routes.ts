import LocalGovernmentAreaController from "../../controllers/local-government-area.controller";
import express from "express";

const LocalGovernmentAreaRoutes = express.Router();

LocalGovernmentAreaRoutes.get("/", LocalGovernmentAreaController.getAll);
LocalGovernmentAreaRoutes.get("/:id", LocalGovernmentAreaController.getOne);

export default LocalGovernmentAreaRoutes;
