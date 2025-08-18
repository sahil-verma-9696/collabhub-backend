import { asyncHandler } from "../../utilities/async-handler.js";

export const logout = asyncHandler(async (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
});
