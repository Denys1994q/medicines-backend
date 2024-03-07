import mongoose from "mongoose";

const ShopSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
    },
);

export default mongoose.model("Shop", ShopSchema);