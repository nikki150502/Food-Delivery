const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const validator = require('validator');
const userModel = require('../models/userModel'); // Adjust the path as necessary

const loginUser = async (req, res) => {
  // Your login logic here
 const {email,password}=req.body;
 
 try {
  const user = await userModel.findOne({email})
  if(!user)
 {
  return res.json({success:false,message:"user not exit"})
 }
//  password check
const isMatch = await bcrypt.compare(password,user.password)
if(!isMatch){
  return res.json({success:false,message:"Incorrect password"})
}

const token =createToken(user._id)
res.json({success:true,token})

 }catch(error){
  console.log(error)
  res.json({success:false,message:"error"})
 }

};

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRETE);
  };

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const exit = await userModel.findOne({ email });
    if (exit) {
      return res.json({ success: false, message: "User already exists" });
    }

    // Validate strong password and email format
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter a valid email" });
    }

    if (password.length < 8) {
      return res.json({ success: false, message: "Please enter a strong password" });
    }

    // Hashing user password
    const salt = await bcrypt.genSalt(9);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name: name,
      email: email,
      password: hashPassword,
    });

    const user = await newUser.save();
    const token = createToken(user._id);
    res.json({ success: true, token });

  } catch (error) {
    console.error('Error registering user:', error);
    res.json({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
