import express from "express";
import { authCheck } from "../middlewares/auth.js";
import { getAllAgents, getAllUsers, getUserById } from "../controllers/user.js";

const router = express.Router();

router.get("/",  getAllUsers);
router.get("/agents",  getAllAgents);
router.get("/:userId",  getUserById);


export default router;