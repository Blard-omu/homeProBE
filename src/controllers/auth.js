import User from "../models/user.js";
import { hashPassword, comparePassword } from "../helpers/index.js";
import jwt from "jsonwebtoken"; 

export const register = async (req, res) => {
  try {
    const { firstName, lastName, userName, email, password, phoneNumber } = req.body;
    console.log(req.body);

    // Handle validation 
    if(!firstName){
        return res.status(400).json({ success: false, message: "First name is required." });
    }
    if(!lastName){
        return res.status(400).json({ success: false, message: "Last name is required." });
    }
    if(!userName){
        return res.status(400).json({ success: false, message: "Username is required." });
    }
    if(!email){
        return res.status(400).json({ success: false, message: "Email is required." });
    }
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
        return res.status(400).json({ success: false, message: "Invalid email format." });
    }
    if(!password){
        return res.status(400).json({ success: false, message: "Password is required." });
    }
    if(!phoneNumber){
        return res.status(400).json({ success: false, message: "Phone number is required." });
    }
    if(password.length < 6){
        return res.status(400).json({ success: false, message: "Password must be at least 6 characters long." });
    }

    // Check if email already exists
    const userExists = await User.findOne({ email: email});
    if(userExists){
        return res.status(400).json({ success: false, message: "Email already exists"})
    }

    // Check if userName is taken
    const userNameTaken = await User.findOne({ userName: userName });
    if(userNameTaken){
        return res.status(400).json({ success: false, message: `Username "${userName}" already taken`})
    }

    // hashing user password
    const hashedPassword = await hashPassword(password);

    // Create a new user
    const user = new User({
        firstName,
        lastName,
        userName,
        email,
        phoneNumber,
        password: hashedPassword,
    })

    // Save the user to the database
    await user.save();

    // Generate a token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Send response
    return res.json({ success: true, message: "Registration successful", user: {
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.userName,
        email: user.email,
        role: user.role,
        token
    }});
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Registration failed", error: err });
  }
};


export const login = async (req, res) => {
    try {
      const { identifier, password } = req.body; 
  
      if (!identifier) {
        return res.status(400).json({
          success: false,
          message: 'Email or username  is required',
        });
      }
      if (!password) {
        return res.status(400).json({
          success: false,
          message: 'Password  is required',
        });
      }
  
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
      const isEmail = emailRegex.test(identifier);
  
      const user = await User.findOne(isEmail ? { email: identifier } : { userName: identifier });
  
      // If no user is found
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found',
        });
      }
  
      // Verify the password
      const isMatch = await comparePassword(password, user.password);
      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: 'Incorrect password',
        });
      }
  
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
  
      return res.json({
        success: true,
        message: 'Login successful',
        user: {
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.userName,
          email: user.email,
          role: user.role,
          token,
        },
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        success: false,
        message: 'Login failed',
        error: err.message,
      });
    }
  };
  


// forgotPassword

//  resetPassword

// socialAuth e. g GoogleAuth

