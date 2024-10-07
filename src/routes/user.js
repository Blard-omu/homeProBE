import express from "express";
import { authCheck } from "../middlewares/auth.js";
import { getAllAgents } from "../controllers/user.js";

const router = express.Router();

router.get("/agents",  getAllAgents);


export default router;