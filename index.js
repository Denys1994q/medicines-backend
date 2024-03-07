import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { ShopsController, MedicineController, OrdersController } from "./controllers/index.js";
import { createOrderValidation } from "./validation/validation.js";
import handleValidationErrors from "./utils/handleValidationErrors.js";

const app = express();
app.use(express.json());

const corsOptions = {
    origin: ["https://medicine-theta.vercel.app", "http://localhost:3000"],
    credentials: true,
};
app.use(cors(corsOptions));

dotenv.config();

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("DB Ok"))
    .catch(err => console.log("ERROR", err));

// get all shops
app.get("/shops", ShopsController.getAllShops);
// get shop medicines
app.get("/medicines/:shop_id", MedicineController.getShopMedicines);
// create an order
app.post("/orders", createOrderValidation, handleValidationErrors, OrdersController.createOrder);
// get user orders history
app.get("/ordersHistory/:userEmail", OrdersController.getUserOrders);

app.use((req, res, next) => {
    res.status(404).json({ message: "Page not found" });
});

app.listen("4444", err => {
    if (err) {
        return console.log(err);
    }
    console.log("Server OK");
});
