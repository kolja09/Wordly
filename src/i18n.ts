import { createI18n } from "vue-i18n";
import ua from "./common/locales/ua.json";
import en from "./common/locales/en.json";

const messages = {
  ua,
  en,
};

const defaultLocale =
  document.cookie.replace(/(?:(?:^|.*;\s*)lang\s*=\s*([^;]*).*$)|^.*$/, "$1") ||
  "ua";

const i18n = createI18n({
  legacy: false,
  locale: defaultLocale,
  fallbackLocale: "ua",
  messages,
});

export default i18n;
