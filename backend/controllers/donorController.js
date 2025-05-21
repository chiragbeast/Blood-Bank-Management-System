import Donor from "../models/Donor.js";
// @desc    Create a new donor
// @route   POST /api/donors
// @access  Public
export const createDonor = async (req, res) => {
    try {
        const { name, age, bloodType, contact, city, lastDonationDate } = req.body;

        if (!name || !age || !bloodType || !contact || !city) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newDonor = new Donor({
            name,
            age,
            bloodType,
            contact,
            city,
            lastDonationDate: lastDonationDate || null
        });

        await newDonor.save();
        res.status(201).json(newDonor);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// @desc    Get all donors
// @route   GET /api/donors
// @access  Public
export const getAllDonors = async (req, res) => {
    try {
        const donors = await Donor.find();
        res.status(200).json(donors);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// @desc    Update donor status
// @route   PUT /api/donors/:id
// @access  Admin
export const updateDonor = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    // Validate status
    const validStatuses = ["Pending", "Approved", "Rejected"];
    if (!validStatuses.includes(status)) {
        return res.status(400).json({ message: "Invalid status value" });
    }

    try {
        const updatedDonor = await Donor.findByIdAndUpdate(
            id,
            { status },
            { new: true } // Ensures we get the updated document
        );

        if (!updatedDonor) {
            return res.status(404).json({ message: "Donor not found" });
        }

        res.json({ message: "Status updated successfully", donor: updatedDonor });
    } catch (error) {
        console.error("Error updating status:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// @desc    Delete donor
// @route   DELETE /api/donors/:id
// @access  Admin
export const deleteDonor = async (req, res) => {
    try {
        const donor = await Donor.findById(req.params.id);
        if (!donor) {
            return res.status(404).json({ message: "Donor not found" });
        }

        await donor.deleteOne();
        res.status(200).json({ message: "Donor deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
