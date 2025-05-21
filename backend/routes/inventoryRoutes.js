import express from "express";
import { addBloodStock, getInventory, updateBloodStock, deleteBloodStock } from "../controllers/inventoryController.js";

const router = express.Router();

router.post("/", addBloodStock);       // Add new blood stock
router.get("/", getInventory);         // Get all inventory
router.patch("/:id", updateBloodStock); // Update blood stock (increase/decrease)
router.delete("/:id", deleteBloodStock); // Delete a blood stock entry

export default router;
