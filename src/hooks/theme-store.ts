import { AppTheme } from '@/src/constants/theme';

const listeners = new Set<() => void>();

let currentAppTheme: AppTheme = 'system';

export const getCurrentAppTheme = () => currentAppTheme;

export const subscribeToThemeChanges = (listener: () => void) => {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
};

export const setStoredAppTheme = (theme: AppTheme) => {
  currentAppTheme = theme;
  listeners.forEach((listener) => listener());
};
