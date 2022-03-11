export const configJwt = {
  algorithm: process.env["JWT_ALGORITHMS"] || "HS256",
  secret: process.env["JWT_SECRET"] || "secret",
  expiresIn: Number(process.env["JWT_EXPIRES_IN"] || 3600),
  unless: ["/api/v1/version", "/api/v1/auth/login", "/api/v1/auth/logout"],
};
