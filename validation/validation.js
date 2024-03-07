import { body } from "express-validator";
import mongoose from 'mongoose';

export const createOrderValidation = [
    body("userEmail").isEmail().withMessage("Invalid email address"),
    body("userName").notEmpty().withMessage("Name is required"),
    body("userAddress").notEmpty().withMessage("Address is required"),
    body("userPhone")
        .notEmpty().withMessage("Phone number is required")
        .matches(/^(\+?3)?8[ -]?\(?(0\d{2})\)?[ -]?(\d{3})[ -]?(\d{2})[ -]?(\d{2})$/)
        .withMessage('Invalid Ukrainian mobile phone number format'),
    body("items").isArray({ min: 1 }).withMessage("At least one item is required"),
    body("items.*.productId").custom((value, { req }) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
            throw new Error("Invalid productId");
        }
        return true;
    }),
    body("items.*.quantity").isInt({ min: 1 }).withMessage("Quantity must be a positive integer"),
    body("totalPrice")
        .notEmpty().withMessage("Total price is required")
        .isNumeric().withMessage("Total price must be a number"),
];
