import Donor from "../models/Donor.js";
import Request from "../models/Request.js";

// @desc    Get count of approved donors and approved requests
// @route   GET /api/stats
// @access  Admin
export const getApprovedCounts = async (req, res) => {
    try {
        // Count approved donors
        const approvedDonorsCount = await Donor.countDocuments({ status: "Approved" });

        // Count approved blood requests
        const approvedRequestsCount = await Request.countDocuments({ status: "Approved" });

        res.status(200).json({
            approvedDonors: approvedDonorsCount,
            approvedRequests: approvedRequestsCount
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
