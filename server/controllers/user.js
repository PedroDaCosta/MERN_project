import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.js";

//SIGNIN
export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    //console.log(req.body);
    const existingUser = await User.findOne({ email: email });

    if (!existingUser) {
      //console.log("User doesn't exist.");
      return res.status(404).json({ message: "User doesn't exist." });
    }
    
    const isPasswordCorrect = await bcrypt.compare( password, existingUser.password );
    
    if (!isPasswordCorrect) {
      //console.log("Invalid credentials");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "test",
      { expiresIn: "1h" }
    );

    res.status(200).json({ result: existingUser, token: token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};

//SIGNUP
export const signup = async (req, res) => {

  const { firstName, lastName, email, password, passwordConfirmation } = req.body;

  try {
    const existingUser = await User.findOne({ email: email });
    
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }
    if(password !== passwordConfirmation){ 
      return res.status(400).json({ message: "Password confirmation doesn't match." });
    }
    
    const hashedPassword = await bcrypt.hash(password, 12);
    
    const result = await User.create({ email: email, password: hashedPassword, name: `${firstName} ${lastName}` });
    
    const token = jwt.sign(
      { email: result.email, id: result._id },
      "test",
      { expiresIn: "1h" }
      );
      
    //console.log({ result: result, token: token });
    res.status(200).json({ result: result, token: token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};
