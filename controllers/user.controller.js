import { RESPONSE_TYPES } from "../constants/responceType.js";
import { User } from "../models/user.models.js";
import { logError } from "../utils/logger.js";
import { COOKIE_CONST } from "./utils/cookeiSetter.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { STATUS_CODES } from "../constants/statusCodes.js";
dotenv.config();

export async function userProfile(req, res) {
  try {
    if (!req.cookies || !req.cookies[COOKIE_CONST.ACCESS_TOKEN]) {
      return res.status(STATUS_CODES.UNAUTHORIZED).json({
        type: RESPONSE_TYPES.ERROR,
        message: "Access token is missing",
        payload: null,
      });
    }

    const userAccessToken = req.cookies[COOKIE_CONST.ACCESS_TOKEN];

    // ✅ Verify JWT
    const decodedUser = jwt.verify(
      userAccessToken,
      process.env.ACCESS_TOKEN_SECRET
    );
    console.log(decodedUser);
    // ✅ Fetch full user details from the database
    const user = await User.findById(decodedUser.userId).select("-password"); // Exclude password

    if (!user) {
      return res.status(STATUS_CODES.NOT_FOUND).json({
        type: RESPONSE_TYPES.ERROR,
        message: "User not found",
        payload: null,
      });
    }

    res.status(STATUS_CODES.OK).json({
      type: RESPONSE_TYPES.SUCCESS,
      message: "User profile fetched successfully",
      payload: { user },
    });
  } catch (error) {
    logError(import.meta.url, error.message);

    const statusCode =
      error.name === "JsonWebTokenError" || error.name === "TokenExpiredError"
        ? STATUS_CODES.UNAUTHORIZED
        : STATUS_CODES.INTERNAL_SERVER_ERROR;

    res.status(statusCode).json({
      type: RESPONSE_TYPES.ERROR,
      message: error.message,
      payload: null,
    });
  }
}

export async function updateProfileByUser(req, res) {
  try {
    // 1️⃣ Extract Access Token from Cookie
    const userAccessToken = req.cookies[COOKIE_CONST.ACCESS_TOKEN];

    if (!userAccessToken) {
      return res.status(STATUS_CODES.UNAUTHORIZED).json({
        type: RESPONSE_TYPES.ERROR,
        message: "Unauthorized - No token provided",
        payload: null,
      });
    }

    // 2️⃣ Decode Token and Get User ID
    const decodedUser = jwt.verify(
      userAccessToken,
      process.env.ACCESS_TOKEN_SECRET
    );
    const userId = decodedUser.userId;

    // 3️⃣ Fetch User from Database
    const user = await User.findById(userId);
    if (!user) {
      return res.status(STATUS_CODES.NOT_FOUND).json({
        type: RESPONSE_TYPES.ERROR,
        message: "User not found",
        payload: null,
      });
    }

    // 4️⃣ Update Only Changed Fields
    const { name, avatar } = req.body;
    if (name) user.name = name;
    if (avatar) user.avatar = avatar;

    // 5️⃣ Save Updated User
    await user.save();

    return res.status(STATUS_CODES.OK).json({
      type: RESPONSE_TYPES.SUCCESS,
      message: "Profile updated successfully",
      payload: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      type: RESPONSE_TYPES.ERROR,
      message: error.message,
      payload: null,
    });
  }
}
