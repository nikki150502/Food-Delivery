const express = require("express");
const cors = require('cors');
const connectDB = require('./config/db');
const foodRouter = require("./routes/foodRoute"); // Ensure the correct path to your router
const userRouter = require("./routes/userRoute");
const dotenv=require('dotenv/config');
const cartRouter = require("./routes/cartRoute");
const orderRouter = require("./routes/orderRoute");
 
// App config
const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cors());

// DB connection
connectDB();
 
// API endpoint
app.use("/api/food", foodRouter)
 
app.use("/images", express.static('uploads'))

app.use("/api/user",userRouter)

app.use('/api/cart',cartRouter)

app.use('/api/order',orderRouter)

app.get("/", (req, res) => {
    res.send("hello");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
