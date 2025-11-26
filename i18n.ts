import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import pl from './locales/pl.json';

const resources = {
  en: { translation: en },
  pl: { translation: pl },
};

// Получение сохранённого языка
const getMemoryLanguage = async () => {
  const lang = await AsyncStorage.getItem('app_language');
  return lang ?? null;
};

// Получение языка устройства
const getDeviceLanguage = () => {
  const deviceLang = Localization.getLocales()[0]?.languageCode;
  if(deviceLang)
    return ['en', 'pl'].includes(deviceLang) ? deviceLang : 'en';
  else{
    return 'en'
  }
};

// Инициализация i18n
i18n.use(initReactI18next).init({
  resources,
  lng: 'en', // временно, позже сменим на реальный
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

// Асинхронно устанавливаем язык после загрузки
getMemoryLanguage().then((savedLang) => {
  const language = savedLang ?? getDeviceLanguage();
  i18n.changeLanguage(language);
});

export default i18n;
