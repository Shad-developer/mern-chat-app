import User from "../model/userModel.js";
import bcrypt from "bcrypt";
import generateTokenandSetCookie from "../utils/generateToken.js";

export const getSignup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;

    //   validation
    if (!fullName || !username || !password || !confirmPassword || !gender) {
      return res.status(400).json({ error: "Please fill all fields" });
    }

    //  matching password
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    //   check if user exist
    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }

    //   hashed password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const maleProfile = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const femaleProfile = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    //   save user into database
    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? maleProfile : femaleProfile,
    });

    if (newUser) {
      // generate jwt token here
      generateTokenandSetCookie(newUser._id, res);

      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        username: newUser.username,
        fullName: newUser.fullName,
        profilePic: newUser.profilePic,
        gender: newUser.gender,
        message: "User created successfully",
      });
    } else {
      res.status(500).json({ error: "Invalid User Data" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: "Invalid Username and Password" });
    }
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: "User does not exist" });
    }

    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      return res.status(400).json({ error: "Invalid Password" });
    }

    // generate jwt token here
    generateTokenandSetCookie(user._id, res);
    res.status(200).json({
      _id: user._id,
      username: user.username,
      fullName: user.fullName,
      profilePic: user.profilePic,
      message: "User logged in successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const Logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
