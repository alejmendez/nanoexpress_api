export const configJwt = {
  algorithm: process.env["JWT_ALGORITHMS"] || "HS256",
  secret: process.env["JWT_SECRET"] || "secret",
  expiresIn: Number(process.env["JWT_EXPIRES_IN"] || 3600),
  expirationTimeWithRememberMe: 3600 * 24 * 30, // 30 days
  unless: ["/api/v1/version", "/api/v1/auth/login", "/api/v1/auth/logout"],
};
