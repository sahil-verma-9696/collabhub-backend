export const asyncHandler = (fn) => (req, res, next) => {
  console.log("asyncHandler");
  Promise.resolve(fn(req, res, next)).catch(next);
};
