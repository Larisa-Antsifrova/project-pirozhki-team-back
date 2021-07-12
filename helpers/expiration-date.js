const expirationDate = {
  maxCookieAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  expiresInAccessToken: "2h",
  expiresInRefreshToken: "30d",
};

module.exports = expirationDate;
