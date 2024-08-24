
const mongoose = require('mongoose');
// create schema
const foodSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    description:{
        type:String,
        
    },
    price:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    }

})

// create model
const foodModel = mongoose.models.food || mongoose.model("food",foodSchema)

module.exports = foodModel;