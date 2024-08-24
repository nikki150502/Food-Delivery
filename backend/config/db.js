const mongoose = require('mongoose')

const connectDB = async()=>{
   
   await mongoose.connect("mongodb+srv://nikitakumawat690:TastyFood@cluster0.asdqguk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(()=>console.log("connection sucessfully done"))
}

module.exports = connectDB;