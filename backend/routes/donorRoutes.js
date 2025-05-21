import express from "express";
import { createDonor, getAllDonors, updateDonor, deleteDonor } from "../controllers/donorController.js";

const router = express.Router();

router.post("/", createDonor);       // Create a donor
router.get("/", getAllDonors);       // Get all donors
router.patch("/:id", updateDonor);     // Update donor by ID
router.delete("/:id", deleteDonor);  // Delete donor by ID

export default router;
