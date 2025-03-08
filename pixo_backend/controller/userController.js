const jwt = require("jsonwebtoken"); 
const userModel = require("../model/userSchema");
const bcrypt = require("bcryptjs");

//create new user
const signIn = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExist =await userModel.findOne({ email });
    if (userExist)return res.status(400).json("User already exists!");

    const hashedPass = await bcrypt.hash(password, 10);

    const role = email === "semwaleishta6@gmail.com" ? "admin" : "user";

    const newUser = new userModel({ name, email, password: hashedPass, role });
    await newUser.save();
    res.json({ message: "User registered successfully!" });
  } catch (err) {
    res.status(500).json(err.message);
  }
}; 

//login exixting user
// const logIn = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const userExist =await userModel.findOne({ email });
//     if (!userExist)
//      return res.status(400).json({ message: "User not found! Please sign up." });

//     const matchPass = await bcrypt.compare(password, userExist.password);
//     if (!matchPass)
//       return res.status(400).json({ message: "Invalid password!" });

//     const token = jwt.sign(
//       { userId: userExist._id, role: userExist.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "1h" }
//     );
//     res.json({ token, userExistId: userExist._id, role: userExist.role });
//   } catch (err) {
//     res.status(500).json(err.message);
//   }
// };


const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await userModel.findOne({ email });
    if (!userExist)
      return res.status(400).json({ success: false, message: "User not found! Please sign up." });

    const matchPass = await bcrypt.compare(password, userExist.password);
    if (!matchPass)
      return res.status(400).json({ success: false, message: "Invalid password!" });

    const token = jwt.sign(
      { userId: userExist._id, role: userExist.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ success: true, token, user: userExist });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

 
module.exports = { signIn, logIn };
