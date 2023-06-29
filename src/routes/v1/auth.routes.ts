import authController from "../../controllers/auth.controller";
import express from "express";

const authRoutes = express.Router();

authRoutes.post("/signup", authController.signUp);

export default authRoutes;
