
const mongoose = require("mongoose")
const orderModel = require('../models/orderModel.js');
const userModel = require('../models/userModel.js');
 const Stripe = require('stripe');
 const stripe = new Stripe(process.env.STRIPE_SECRETE_KEY);

 
// Placing user order for frontend
const placeOrder = async (req, res) => {
    const frontend_url = "http://localhost:3001";

    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        });
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100 * 80
            },
            quantity: item.quantity
        }));
        line_items.push({
            price_data: {
                currency: "inr",
                product_data: {
                    name: "delivery charge"
                },
                unit_amount: 2 * 100 * 80,
                quantity: 1
            }
        });

        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
        });

        res.json({ success: true, session_url: session.url });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "error" });
    }
};



const verifyOrder = async (req, res) => {
    const { orderId, sucess } = req.body;
    try {
        if (sucess == "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true })

            res.json({ success: trur, message: "paid" })
        } else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({ success: fase, message: "not paid" })
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "error" });
    }
}
// user order for frontend
const userOrders = async (req, res) => {
    try {

        const orders = await orderModel.find({ userId: req.body.userId })
        res.json({ success: true, data: orders })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "error" })
    }
}

// listing order for admin
const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, data: orders })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "error" })
    }
}

// api for updataing status
const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status })
        res.json({ success: true, message: 'status updated' })
    }
    catch (error) {
        console.log(error)
        res.json({ success: false, message: "error" })
    }
}

module.exports = { placeOrder,
     verifyOrder,
    userOrders,
    listOrders,
     updateStatus };
