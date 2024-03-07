import Shop from "../models/Shop.js";

export const getAllShops = async (req, res) => {
    try {
        const allShops = await Shop.find();
        res.status(200).json(allShops);
    } catch (err) {
        console.error("Error getting all shops:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};