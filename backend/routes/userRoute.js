const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController.js'); // Destructure the functions from the controller

const userRouter = express.Router();

userRouter.post('/register', registerUser); // Pass the function itself
userRouter.post('/login', loginUser); // Pass the function itself

module.exports = userRouter;
