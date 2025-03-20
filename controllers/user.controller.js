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
    const user = req.user;

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
    // 3️⃣ Fetch User from request
    const user = req.user;
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

// TODO: Implement Search Users pending due to skill model not created
export async function searchUsers(req, res) {}
