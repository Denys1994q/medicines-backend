import Order from "../models/Order.js";
import Medicine from "../models/Medicine.js";

export const createOrder = async (req, res) => {
    try {
        const { userEmail, userName, userAddress, userPhone, items, totalPrice } = req.body;

        for (const item of items) {
            const productExists = await Medicine.findById(item.productId);
            if (!productExists) {
                return res.status(400).json({ error: `Product with ID ${item.productId} not found` });
            }
        }

        const newOrder = new Order({
            userEmail,
            userName,
            userAddress,
            userPhone,
            items,
            totalPrice,
        });

        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (err) {
        // Обробити помилку
        console.error("Error creating order:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getUserOrders = async (req, res) => {
    try {
        const { userEmail } = req.params;
        let userOrders = await Order.find({ userEmail }).populate({
            path: "items.productId",
            model: "Medicine",
        });
        if (userOrders.length === 0) {
            return res.status(404).json({ message: "No orders found for the user" });
        }
        userOrders = userOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        res.status(200).json(userOrders);
    } catch (err) {
        console.error("Error fetching user orders:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
