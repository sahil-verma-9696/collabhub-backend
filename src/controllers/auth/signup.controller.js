import User from "../../models/user.model.js";
import { asyncHandler } from "../../utilities/async-handler.js";
import { generateToken } from "../../utilities/generateToken.js";

export const signup = asyncHandler(async (req, res) => {
  console.log(req.body)
  const { name, email, password, profile_picture } = req.body;

  if (!name || !email || !password) {
    const err = new Error("Name, email, and password are required");
    err.statusCode = 400;
    throw err;
  }

  // excute if model change and previous model inforce some indexing
  const monogores = await User.syncIndexes();
  // console.log(monogores)


  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const err = new Error("Email already in use");
    err.statusCode = 400;
    throw err;
  } 


  const newUser = await User.create({
    name,
    email,
    password,
    profile_picture,
  });

  await newUser.save();

  const token = generateToken(newUser._id);

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(201).json({
    message: "User registered successfully",
    user: {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      profile_picture: newUser.profile_picture,
      status: newUser.status,
      createdAt: newUser.createdAt,
    },
  });
});
