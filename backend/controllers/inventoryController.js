import Inventory from "../models/Inventory.js";


export const addBloodStock = async (req, res) => {
    try {
        const { bloodType, quantity } = req.body;

        if (!bloodType || quantity < 0) {
            return res.status(400).json({ message: "Invalid blood type or units" });
        }

        let existingStock = await Inventory.findOne({ bloodType });

        if (existingStock) {
            existingStock.units += units;
            await existingStock.save();
            return res.status(200).json({ message: "Blood stock updated", data: existingStock });
        }

        const newStock = new Inventory({ bloodType, quantity });
        await newStock.save();
        res.status(201).json({ message: "New blood stock added", data: newStock });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
// @desc    Get blood inventory
// @route   GET /api/inventory
export const getInventory = async (req, res) => {
    try {
        const inventory = await Inventory.find();
        res.status(200).json(inventory);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// @desc    Update inventory
// @route   PUT /api/inventory/:id
export const updateBloodStock = async (req, res) => {
    try {
        const { quantity } = req.body;

        if (quantity === undefined) {
            return res.status(400).json({ message: "Change value is required" });
        }

        const inventory = await Inventory.findById(req.params.id);
        if (!inventory) {
            return res.status(404).json({ message: "Blood stock not found" });
        }

        inventory.quantity += quantity;
        if (inventory.quantity < 0) inventory.quantity = 0; // Ensure stock never goes negative
        await inventory.save();

        res.status(200).json({ message: "Stock updated successfully", data: inventory });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const deleteBloodStock = async (req, res) => {
    try {
        const inventory = await Inventory.findById(req.params.id);
        if (!inventory) {
            return res.status(404).json({ message: "Blood stock not found" });
        }

        await inventory.deleteOne();
        res.status(200).json({ message: "Blood stock deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
