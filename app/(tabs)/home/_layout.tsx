import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';

export default function HomeLayout() {
  const { t } = useTranslation()

  return (
    <Stack
      screenOptions={{
        headerShown: false, // Можно включить, если нужны заголовки
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Główna' }} />

      <Stack.Screen name="sub_pages/data" options={{title:t('home.office_data'), headerShown:true, headerBackButtonDisplayMode:'minimal'}}/>
      <Stack.Screen name="sub_pages/editors" options={{title:t('home.bip_editors'), headerShown:true, headerBackButtonDisplayMode:'minimal', headerTransparent:true}}/>
      <Stack.Screen name="sub_pages/hours" options={{title:t('home.opening_hours'), headerShown:true, headerBackButtonDisplayMode:'minimal', headerTransparent:true}}/>
      <Stack.Screen name="sub_pages/bank_accounts" options={{title:t('home.bank_accounts'), headerShown:true, headerBackButtonDisplayMode:'minimal', headerTransparent:true}}/>
      {/* <Stack.Screen name="subpage" options={{ title: 'Подстраница Główna' }} /> */}
    </Stack>
  );
}