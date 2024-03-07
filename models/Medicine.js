import mongoose from "mongoose";

const MedicineSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true, 
        },
        image: {
            type: String,
        },
        price: {
            type: Number,
            required: true,
        },
        shop_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Shop',
            required: true
        }
    },
);

export default mongoose.model("Medicine", MedicineSchema);