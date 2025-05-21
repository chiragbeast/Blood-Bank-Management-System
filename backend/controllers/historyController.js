import Request from "../models/Request.js";
import Donor from "../models/Donor.js";

// Fetch history of blood requests
export const getBloodRequestsHistory = async (req, res) => {
    try {
        const requests = await Request.find().sort({ createdAt: -1 });
        res.status(200).json({ historyRequests: requests });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Fetch history of donors
export const getDonorsHistory = async (req, res) => {
    try {
        const donations = await Donor.find().sort({ createdAt: -1 });
        res.status(200).json({ historyDonors: donations });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
