export const configI18n = {
  locales: ["en", "es"],
  defaultLocale: process.env["APP_DEFAULT_LOCALE"] ?? "en",
  directory: "../locales",
};
