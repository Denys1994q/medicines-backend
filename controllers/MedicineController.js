import Medicine from "../models/Medicine.js";

export const getShopMedicines = async (req, res) => {
    try {
        const { shop_id } = req.params;
        const medicines = await Medicine.find({ shop_id });
        res.status(200).json(medicines);
    } catch (err) {
        console.error("Error getting medicines:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
