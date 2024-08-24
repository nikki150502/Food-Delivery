
const userModel = require('../models/userModel.js')

// add items in user cart
const addToCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId)
        let cartData = await userData.cartData;
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        } else {
            cartData[req.body.itemId] += 1;

        }
        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        res.json({ success: true, message: "Added to Cart" });
    }
    catch (error) {
        console.log(error)
        res.json({ success: false, message: "error" })

    }
}

// remove from user cart
const removeFromCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData
        if (cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId, { cartData })
        res.json({ success: true, message: "Removed from cart" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "error" })
    }
}

// fetch user cart data

const getCart = async (req, res) => {
    try {
      // Find the user by their ID
      const userData = await userModel.findById(req.body.userId);
      
      // Check if the user exists
      if (!userData) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
  
      // Retrieve the cart data from the user's document
      const cartData = userData.cartData;
  
      // Respond with the cart data
      res.json({ success: true, cartData });
    } catch (error) {
      console.error('Error retrieving cart data:', error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  };
  
module.exports = {
    addToCart, removeFromCart, getCart
}