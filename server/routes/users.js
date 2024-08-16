import express from "express";
import {} from "../controllers/users.js";

const router = express.Router();

router.post("/signup");
router.get("/login");

export default router;
