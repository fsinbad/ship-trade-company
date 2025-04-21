// utils/i18n.js
import { i18n } from 'next-i18next'

export const changeLanguage = (lang) => {
  if (i18n) {
    i18n.changeLanguage(lang)
    document.cookie = `NEXT_LOCALE=${lang};path=/`
  }
}