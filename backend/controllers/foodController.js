

const fs = require('fs');
const foodModel = require('../models/foodModel');

// add food item

const addFood = async (req, res) => {
   let image_filename = `${req.file.filename}`;

   const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: image_filename
   });
   try {
      await food.save();
      res.json({ success: true, message: "Food added" })
   } catch (error) {
      console.log(error)
      res.json({ success: false, message: "error" })
   }
}

// all list food
const listFood = async (req, res) => {
   try {
      const foods = await foodModel.find({});
      res.json({ success: true, data: foods })
   }
   catch (error) {
      console.log(error);
      res.json({ success: false, message: error })
   }
}

// // // remove food item
const removeFood = async (req, res) => {
    try {
        // Find the food item by ID
        const food = await foodModel.findById(req.body.id);
        if (!food) {
            return res.status(404).json({ success: false, message: "Food item not found" });
        }

        // Delete the image file associated with the food item
        fs.unlink(`uploads/${food.image}`, (err) => {
            if (err) {
                console.error("Error deleting file:", err);
            }
        });

        // Delete the food item from the database
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Food removed" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

module.exports = {
   addFood,
   listFood,
   removeFood
 };