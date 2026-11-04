const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

router.get("/", async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

router.post("/", async (req, res) => {
    const product = await Product.create(req.body);
    res.json(product);
});

router.get("/seed", async (req, res) => {
    await Product.deleteMany();

    await Product.insertMany([
        {
            name: "Wireless Headphones",
            price: 1499,
            description: "High quality wireless headphones",
            image: "https://via.placeholder.com/300",
            category: "Electronics"
        },
        {
            name: "Smart Watch",
            price: 1999,
            description: "Modern smartwatch with fitness tracking",
            image: "https://via.placeholder.com/300",
            category: "Electronics"
        },
        {
            name: "Running Shoes",
            price: 2499,
            description: "Comfortable shoes for running",
            image: "https://via.placeholder.com/300",
            category: "Fashion"
        }
    ]);

    res.send("Products added successfully");
});

module.exports = router;