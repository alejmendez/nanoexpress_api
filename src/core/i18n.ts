import fs from "fs";
import path from "path";
import Polyglot from "node-polyglot";
import { config } from "./config";

class I18n {
  protected locales: Array<any> = [];
  protected defaultLocale: string = "";

  protected currentLocales: string = "";
  protected translations: any = {};
  protected polyglot: Polyglot;

  constructor() {
    this.init();
  }

  public init() {
    this.locales = config("i18n.locales");
    this.defaultLocale = config("i18n.defaultLocale");
    this.currentLocales = this.defaultLocale;

    this.locales.map((locale) => {
      this.translations[locale] = new Polyglot({ locale });
    });
  }

  public async loadTranslations(directory: string) {
    for (const locale of this.locales) {
      const file = path.join(__dirname, directory, `${locale}.json`);

      if (!fs.existsSync(file)) {
        continue;
      }
      let rawData = fs.readFileSync(file, "utf8");
      let jsonData = JSON.parse(rawData);
      this.loadTranslation(locale, jsonData);
    }
  }

  public loadTranslation(locale: string, translations: any) {
    this.translations[locale].extend(translations);
  }

  public __(text: string, dictionary: any = {}) {
    let translationLocale = this.translations[this.currentLocales];
    if (translationLocale === undefined) {
      return text;
    }

    let translation = translationLocale.t(text, dictionary);
    if (translation === undefined) {
      return text;
    }
    return translation;
  }
}

let i18n: I18n;
const getI18n = () => {
  if (!i18n) {
    i18n = new I18n();
  }
  return i18n;
};

const __ = (text: string, dictionary: any = {}) => i18n.__(text, dictionary);

export { getI18n, __ };
