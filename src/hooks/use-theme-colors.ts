import { AppTheme, Colors, getThemePalette, setCurrentThemeVariant, ThemeVariant } from '@/src/constants/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appearance, useColorScheme } from 'react-native';
import { useCallback, useEffect, useState } from 'react';
import { getCurrentAppTheme, setStoredAppTheme, subscribeToThemeChanges } from './theme-store';

export const APP_THEME_STORAGE_KEY = 'app_theme';

let themeLoadPromise: Promise<AppTheme> | null = null;

const isAppTheme = (value: string | null): value is AppTheme =>
    value === 'light' ||
    value === 'dark' ||
    value === 'system' ||
    value === 'contrast' ||
    value === 'monochrome';

export const resolveThemeVariant = (
    appTheme: AppTheme,
    systemScheme: 'light' | 'dark' | null | undefined
): ThemeVariant => {
    if (appTheme === 'system') {
        return systemScheme ?? 'light';
    }

    return appTheme;
};

export const resolveColorScheme = (
    appTheme: AppTheme,
    systemScheme: 'light' | 'dark' | null | undefined
): 'light' | 'dark' => (resolveThemeVariant(appTheme, systemScheme) === 'dark' ? 'dark' : 'light');

const syncAppearance = (theme: AppTheme) => {
    if (theme === 'light' || theme === 'dark') {
        Appearance.setColorScheme(theme);
        return;
    }
    if (theme === 'contrast') {
        Appearance.setColorScheme('dark');
        return;
    }

    if (theme === 'monochrome') {
        Appearance.setColorScheme('light');
        return;
    }

    Appearance.setColorScheme(null);
};

const applyThemeState = (theme: AppTheme) => {
    setStoredAppTheme(theme);
    setCurrentThemeVariant(theme);
    syncAppearance(theme);
};

export const loadStoredAppTheme = async (): Promise<AppTheme> => {
    if (!themeLoadPromise) {
        themeLoadPromise = AsyncStorage.getItem(APP_THEME_STORAGE_KEY).then((savedTheme) => {
            const appTheme = isAppTheme(savedTheme) ? savedTheme : 'system';
            applyThemeState(appTheme);
            return appTheme;
        }).finally(() => {
            themeLoadPromise = null;
        });
    }

    return themeLoadPromise;
};

export const saveAppTheme = async (theme: AppTheme) => {
    applyThemeState(theme);
    await AsyncStorage.setItem(APP_THEME_STORAGE_KEY, theme);
};

type UseAppThemeResult = {
    appTheme: AppTheme;
    colorScheme: 'light' | 'dark';
    colors: ReturnType<typeof getThemePalette>;
    isContrast: boolean;
    isDark: boolean;
    isLight: boolean;
    isMonochrome: boolean;
    isSystem: boolean;
    resolvedTheme: ThemeVariant;
    setAppTheme: (theme: AppTheme) => Promise<void>;
    systemScheme: 'light' | 'dark' | null | undefined;
    theme: ReturnType<typeof getThemePalette>;
};

export function useAppTheme() {


    const systemScheme = useColorScheme();
    const [appTheme, setAppThemeState] = useState<AppTheme>(getCurrentAppTheme());

    useEffect(() => {
        let isMounted = true;

        loadStoredAppTheme().then((theme) => {
            if (isMounted) {
                setAppThemeState(theme);
            }
        });

        return () => {
            isMounted = false;
        };
    }, []);

    useEffect(() => {
        return subscribeToThemeChanges(() => {
            setAppThemeState(getCurrentAppTheme());
        });
    }, []);

    const setAppTheme = useCallback(async (theme: AppTheme) => {
        setAppThemeState(theme);
        await saveAppTheme(theme);
    }, []);

    const resolvedTheme = resolveThemeVariant(appTheme, systemScheme);
    const colorScheme = resolveColorScheme(appTheme, systemScheme);
    const theme = getThemePalette(resolvedTheme);

    return {
        appTheme,
        colorScheme,
        colors: theme,
        isContrast: resolvedTheme === 'contrast',
        isDark: colorScheme === 'dark',
        isLight: colorScheme === 'light',
        isMonochrome: resolvedTheme === 'monochrome',
        isSystem: appTheme === 'system',
        resolvedTheme,
        setAppTheme,
        systemScheme,
        theme,
    } satisfies UseAppThemeResult;
}

export function useThemeColors() {
    const { theme } = useAppTheme();

    return theme;
}

export { Colors };
