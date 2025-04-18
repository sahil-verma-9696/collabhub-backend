export const COOKIE_CONST = {
  ACCESS_TOKEN: "accessToken",
  REFRESH_TOKEN: "refreshToken",
};
export function setCookie(res) {
  return {
    setAccessToken: function (accessToken) {
      res.cookie(COOKIE_CONST.ACCESS_TOKEN, accessToken, {
        httpOnly: true, // prevent XSS attacks, cross-site script injection
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict", // prevent cross-site request forgery  CSRF
        maxAge: 15 * 60 * 1000,
      });
    },
    setRefreshToken: function (refreshToken) {
      res.cookie(COOKIE_CONST.REFRESH_TOKEN, refreshToken, {
        httpOnly: true, // prevent XSS attacks, cross-site script injection
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict", // prevent cross-site request forgery  CSRF
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
    },
  };
}
