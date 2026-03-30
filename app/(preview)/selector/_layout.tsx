import { useAppTheme } from '@/src/hooks/use-theme-colors';
import { Stack } from 'expo-router';

export default function PreviewSelectorLayout() {
    const { theme } = useAppTheme();
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
        </Stack>
    );
}