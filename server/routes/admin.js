import express from "express";
import { loginAdmin, registerdAmin } from "../controllers/adminAuth.js";

const router = express.Router();

router.post("/register", registerdAmin);
router.post("/login", loginAdmin);

export default router;
