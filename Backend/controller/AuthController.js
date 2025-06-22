import StudentAuthData from "../models/studentAuth.js";
import bcrypt from 'bcrypt';

const AuthRegister = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    const emailData = await StudentAuthData.find({ email });
    if (emailData.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    const userPassword = await bcrypt.hash(password, 10);
    const data = new StudentAuthData({ userName, email, password: userPassword });

    await data.save();

    res.status(200).json({ message: "User Registered Successfully", data });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

export default AuthRegister;
