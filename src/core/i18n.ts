import fs from "fs";
import Path from "path";
import { config } from "./config";

class I18n {
  protected locales: Array<any> = [];
  protected defaultLocale: string = "";

  protected currentLocales: string = "";
  protected translations: any = {};

  constructor() {
    this.init();
  }

  public init() {
    this.locales = config("i18n.locales");
    this.defaultLocale = config("i18n.defaultLocale");
    this.currentLocales = this.defaultLocale;
  }

  public async loadTranslations(directory: string) {
    for (const locale of this.locales) {
      const file = `${directory}/${locale}.json`;

      if (!fs.existsSync(Path.join(__dirname, file))) {
        continue;
      }
      const translations = await import(file);
      this.loadTranslation(locale, translations);
    }
  }

  public loadTranslation(locale: string, translations: any) {
    this.translations[locale] = {
      ...this.translations[locale],
      ...translations,
    };
  }

  public __(text: string, dictionary: any = {}) {
    let translationLocale = this.translations[this.currentLocales];
    if (translationLocale === undefined) {
      return text;
    }

    let translation = translationLocale[text];
    if (translation === undefined) {
      return text;
    }
    for (const word in dictionary) {
      translation = translation.replaceAll(`\${${word}}`, dictionary[word]);
    }
    return translation;
  }
}

const i18n = new I18n();
const __ = (text: string, dictionary: any = {}) => i18n.__(text, dictionary);

export { i18n, __ };
