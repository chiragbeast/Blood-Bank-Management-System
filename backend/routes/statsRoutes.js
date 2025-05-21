import express from "express";
import { getApprovedCounts } from "../controllers/statsController.js";

const router = express.Router();

// Route to get approved donors and requests count
router.get("/", getApprovedCounts);

export default router;
