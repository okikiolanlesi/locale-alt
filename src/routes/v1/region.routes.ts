import regionController from "../../controllers/region.controller";
import express from "express";

const regionRoutes = express.Router();

regionRoutes.get("/", regionController.getAll);
regionRoutes.get("/:id", regionController.getOne);

export default regionRoutes;
