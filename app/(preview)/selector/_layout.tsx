import { useAppTheme } from '@/src/hooks/use-theme-colors';
import { isLiquidGlassAvailable } from 'expo-glass-effect';
import { router, Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Platform } from 'react-native';

export default function PreviewSelectorLayout() {
    const { theme } = useAppTheme();
    const { t } = useTranslation();
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: theme.background }
            }}
        >
            <Stack.Screen name="index" options={{
                headerShown: false,
            }} />
            <Stack.Screen name="select"
                options={{
                    headerShown: true,
                    headerBackButtonDisplayMode: 'minimal',
                    headerTransparent: Platform.OS == 'ios' ? true : false,
                    headerBlurEffect: isLiquidGlassAvailable() ? 'none' : 'regular',
                    title: t('select_bip'),
                    headerTintColor: theme.tint,
                    headerTitleStyle: { color: theme.text },
                    headerLargeStyle: { backgroundColor: 'transparent' },
                    headerLargeTitle: true,
                    headerSearchBarOptions: {
                        headerIconColor: theme.icon,
                        tintColor: theme.tint,
                        textColor: theme.text,
                        hintTextColor: theme.tint,
                        placeholder: t('find'),
                        onChangeText: (event) => {
                            router.setParams({
                                q: event.nativeEvent.text,
                            });
                        },
                    },
                }}
            />
        </Stack>
    );
}