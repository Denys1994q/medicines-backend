import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    userAddress: {
        type: String,
        required: true,
    },
    userPhone: {
        type: String,
        required: true,
    },
    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product", 
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
        },
    ],
    totalPrice: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now, 
    },
});

export default mongoose.model("Order", OrderSchema);
