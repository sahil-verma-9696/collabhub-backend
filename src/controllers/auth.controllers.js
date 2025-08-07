import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import { access } from 'fs';

// JWT_SECRET=process.env.JWT_SECRET //✅

// Register Controller
export const registerUser = async (req, res) => {
  const { name, email, password, username } = req.body;
  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Email already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name, email, password: hashedPassword
      , username
    });
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({
      message: 'Server error',
      error: err.message
    });
  }
};

// Login Controller
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.cookie(process.env.COOKIE_NAME, token, {
      httpOnly: true,
      sameSite: 'strict',
      secure: false,
      maxAge: 86400000
    });
    res.json({ message: 'Logged in successfully' });
  } catch (err) {
    console.error('Login Error:', err);
    res.json({ message: 'Error in login' });
  }
};

// Logout Controller
export const logoutUser = (req, res) => {
  res.clearCookie(process.env.COOKIE_NAME);
  res.json({ message: 'Logged out successfully' });
};

// Get Authenticated User
export const getMe = async (req, res) => {
  const token = req.cookies[process.env.COOKIE_NAME];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    res.json(user);
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
};
