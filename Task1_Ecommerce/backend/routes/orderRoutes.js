const express = require("express");
const Order = require("../models/Order");

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const order = await Order.create(req.body);

        res.json({
            message: "Order placed successfully",
            order
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: "Order failed"
        });
    }
});

router.get("/", async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (error) {
        res.status(500).json({
            message: "Failed to get orders"
        });
    }
});

module.exports = router;