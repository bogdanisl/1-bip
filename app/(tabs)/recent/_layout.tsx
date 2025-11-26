import { Stack } from 'expo-router';

export default function RecentLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,  // Показывать заголовки на подстраницах, если нужно (можно false)
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Recent' }} />
      {/* Добавьте больше <Stack.Screen> для других подстраниц */}
    </Stack>
  );
}