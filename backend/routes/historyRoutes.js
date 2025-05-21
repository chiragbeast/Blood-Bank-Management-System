import express from "express";
import { getBloodRequestsHistory, getDonorsHistory } from "../controllers/historyController.js";

const router = express.Router();

// Endpoint for blood requests history
router.get("/historyrequests", getBloodRequestsHistory);

// Endpoint for donors history
router.get("/historydonors", getDonorsHistory);

export default router;
