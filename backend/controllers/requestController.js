import Request from "../models/Request.js";
import mongoose from "mongoose";
import User from "../models/User.js";

// @desc    Create a new blood request
// @route   POST /api/requests
export const createRequest = async (req, res) => {
    try {
        const { patientName, bloodType, hospital, city, contact, status } = req.body;

        if (!patientName || !bloodType || !hospital || !city || !contact) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newRequest = new Request({
            patientName,
            bloodType,
            hospital,
            city,
            contact,
            status: status || "Pending"
        });

        await newRequest.save();
        res.status(201).json(newRequest);

    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};


export const getUserRequests = async (req, res) => {
    try {
        const { userId } = req.query;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid userId format" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        console.log("✅ User Found:", user.fullName);

        const requests = await Request.find({ userId: userId });

        console.log("📌 Requests Found:", requests);

        if (requests.length === 0) {
            return res.status(404).json({ message: "No requests found for this user." });
        }

        res.status(200).json(requests);
    } catch (error) {
        console.error("❌ Error:", error.message);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};





// @desc    Get all blood requests
// @route   GET /api/requests
export const getAllRequests = async (req, res) => {
    try {
        const requests = await Request.find();
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// @desc    Update blood request status
// @route   PUT /api/requests/:id
export const updateRequest = async (req, res) => {
    try {
        const { status } = req.body;
        const { id } = req.params;

        // Validate status
        if (!["Pending", "Approved", "Rejected"].includes(status)) {
            return res.status(400).json({ message: "Invalid status value" });
        }

        // Validate ID format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid request ID" });
        }

        // Find request by ID
        const request = await Request.findById(id);
        if (!request) {
            return res.status(404).json({ message: "Request not found" });
        }

        // Avoid unnecessary updates
        if (request.status === status) {
            return res.status(200).json({ message: "Status is already updated", updatedRequest: request });
        }

        // Update status
        request.status = status;
        await request.save();

        res.status(200).json({ message: "Request updated successfully", updatedRequest: request });

    } catch (error) {
        console.error("Error updating request:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// @desc    Delete a blood request
// @route   DELETE /api/requests/:id
export const deleteRequest = async (req, res) => {
    try {
        const request = await Request.findById(req.params.id);
        if (!request) {
            return res.status(404).json({ message: "Request not found" });
        }

        await request.deleteOne();
        res.status(200).json({ message: "Request deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
