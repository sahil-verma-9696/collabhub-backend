import { asyncHandler } from "../../utilities/async-handler.js";

export const me = asyncHandler(async (req, res) => {
  res.json({
    message: "Authenticated request",
    user: req.user,
  });
});
