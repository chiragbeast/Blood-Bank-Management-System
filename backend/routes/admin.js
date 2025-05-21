import express from "express";
import User from "../models/User.js";
import BloodRequest from "../models/Request.js"; // Assuming this exists

const router = express.Router();

// Get total users count
router.get("/users", async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        res.json({ totalUsers });
    } catch (error) {
        res.status(500).json({ message: "Error fetching total users", error });
    }
});

// Get pending requests count (Donors + Blood Requests)
router.get("/pending-requests", async (req, res) => {
    try {
        const pendingDonors = await User.countDocuments({ role: "donor" });
        const pendingBloodRequests = await BloodRequest.countDocuments({ status: "pending" }); // Ensure your schema has a status field
        const pendingRequests = pendingDonors + pendingBloodRequests;

        res.json({ pendingRequests });
    } catch (error) {
        res.status(500).json({ message: "Error fetching pending requests", error });
    }
});

export default router;
