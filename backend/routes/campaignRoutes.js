import express from "express";
import { createCampaign, getAllCampaigns , updateCampaign , deleteCampaign} from "../controllers/campaignController.js";

const router = express.Router();

router.post("/", createCampaign);    // Create a blood donation campaign
router.get("/", getAllCampaigns);    // Get all campaigns
router.put("/:id", updateCampaign);  // Update campaign by ID
router.delete("/:id", deleteCampaign);  // Delete campaign by ID

export default router;
