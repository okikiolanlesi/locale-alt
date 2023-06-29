import regionController from "../../controllers/region.controller";
import express from "express";

const regionRoutes = express.Router();

regionRoutes.get("/", regionController.getAll);

export default regionRoutes;
