/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const tintColorLight = '#b50315';
const tintColorDark = '#b50315';

export type ThemeVariant = 'light' | 'dark' | 'contrast' | 'monochrome';
export type AppTheme = ThemeVariant | 'system';

const themePalettes = {
  light: {
    text: '#11181C',
    background: '#ebeaeaff',
    background_2: '#fffefeff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    border: '#969696ff',
    subText: '#757575ff',
    inactive: '#cf0015b2',
    green: '#009116ff',
    whiteText: '#ECEDEE'
  },
  dark: {
    text: '#ECEDEE',
    background: '#000000ff',
    background_2: '#1b1b1bff',
    border: '#ffffff36',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    subText: '#a0a0a0ff',
    inactive: '#b5031565',
    green: '#009116ff',
    whiteText: '#ECEDEE'
  },
  contrast: {
    // czarno-żółty (wysoki kontrast, accessibility-first)
    text: '#ffff00',
    background: '#000000ff',
    background_2: '#222',     // jaśniejszy żółty dla warstw
    tint: '#ffff00',             // czarne akcenty
    icon: '#ffff00',
    tabIconDefault: '#333333ff',
    tabIconSelected: '#000000ff',
    border: '#ffff00',
    subText: '#ffff00',
    inactive: '#7a6a0080',         // przygaszony żółto-brązowy
    green: '#ffff00',
    whiteText: '#000000ff'
  },

  monochrome: {
    // czarno-biały (neutralny, minimalistyczny)
    text: '#000000ff',
    background: '#FFFFFFFF',
    background_2: '#F2F2F2ff',
    tint: '#000000ff',
    icon: '#000000ff',
    tabIconDefault: '#7a7a7aff',
    tabIconSelected: '#000000ff',
    border: '#00000033',
    subText: '#4d4d4dff',
    inactive: '#b0b0b0ff',
    green: '#000000ff', // brak koloru → fallback do czerni
    whiteText: '#ECEDEE'
  }
} as const;

let currentThemeVariant: AppTheme = 'system';

export const setCurrentThemeVariant = (theme: AppTheme) => {
  currentThemeVariant = theme;
};

export const getThemePalette = (theme: ThemeVariant) => themePalettes[theme];

const getAliasPalette = (alias: 'light' | 'dark') => {
  if (currentThemeVariant === 'contrast' || currentThemeVariant === 'monochrome') {
    return themePalettes[currentThemeVariant];
  }

  return themePalettes[alias];
};

export const Colors = {
  get light() {
    return getAliasPalette('light');
  },
  get dark() {
    return getAliasPalette('dark');
  },
  get contrast() {
    return themePalettes.contrast;
  },
  get monochrome() {
    return themePalettes.monochrome;
  },
};

export const hexToRgba = (hex: string, alpha: number) => {
  let r = 0, g = 0, b = 0;

  // #RRGGBB
  if (hex.length === 7) {
    r = parseInt(hex.slice(1, 3), 16);
    g = parseInt(hex.slice(3, 5), 16);
    b = parseInt(hex.slice(5, 7), 16);
  }
  // #RGB
  else if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  }
  return `rgba(${r},${g},${b},${alpha})`;
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
