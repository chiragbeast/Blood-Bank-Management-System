import express from "express";
import { createRequest, getAllRequests, updateRequest, deleteRequest ,getUserRequests } from "../controllers/requestController.js";

const router = express.Router();

router.post("/", createRequest);       // Create a new blood request
router.get("/", getAllRequests);       // Get all blood requests
router.get("/history", getUserRequests);
router.patch("/:id", updateRequest);     // Update request status
router.delete("/:id", deleteRequest);  // Delete request

export default router;
