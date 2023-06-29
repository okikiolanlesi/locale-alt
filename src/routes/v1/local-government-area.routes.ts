import LocalGovernmentAreaController from "../../controllers/local-government-area.controller";
import express from "express";

const LocalGovernmentAreaRoutes = express.Router();

LocalGovernmentAreaRoutes.get("/", LocalGovernmentAreaController.getAll);

export default LocalGovernmentAreaRoutes;
