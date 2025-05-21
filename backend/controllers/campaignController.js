import Campaign from "../models/Campaign.js";

// @desc    Create a blood donation campaign
// @route   POST /api/campaigns
export const createCampaign = async (req, res) => {
    try {
        const { name, location, date, organizer } = req.body;

        if (!name || !location || !date || !organizer) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newCampaign = new Campaign({ name, location, date, organizer });
        await newCampaign.save();

        res.status(201).json(newCampaign);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// @desc    Get all campaigns
// @route   GET /api/campaigns
export const getAllCampaigns = async (req, res) => {
    try {
        const campaigns = await Campaign.find();
        res.status(200).json(campaigns);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const updateCampaign = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedCampaign = await Campaign.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedCampaign) {
            return res.status(404).json({ message: "Campaign not found" });
        }

        res.status(200).json(updatedCampaign);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

export const deleteCampaign = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCampaign = await Campaign.findByIdAndDelete(id);

        if (!deletedCampaign) {
            return res.status(404).json({ message: "Campaign not found" });
        }

        res.status(200).json({ message: "Campaign deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};