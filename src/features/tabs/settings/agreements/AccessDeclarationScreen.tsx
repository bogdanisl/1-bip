import WebViewScreen from "@/src/features/webView/WebViewScreen";
import { useSelectedBipStore } from "@/src/hooks/use-selected-bip";
import { useTranslation } from "react-i18next";

export default function AccessDeclarationScreen() {
    const selectedBip = useSelectedBipStore((s) => s.selectedBip);
    const { t } = useTranslation();
    return <WebViewScreen link={`${selectedBip?.url}/deklaracja_dostepnosci`} name={t('access_declaration')} />
}
// OLD 
// import { Colors } from '@/src/constants/theme';
// import React from 'react';
// import { ScrollView, Text, Linking, useColorScheme } from 'react-native';
// import { styles } from './styles';

// const AccessDeclarationScreen = () => {
//     const theme = useColorScheme() == 'dark' ? Colors.dark : Colors.light;
//     return (
//         <ScrollView style={[styles.container, { backgroundColor: 'transparent' }]} contentContainerStyle={styles.contentContainer}>
//             <Text style={[styles.heading, {color:theme.text}]}>Deklaracja dostępności – aplikacja mobilna 1BIP.pl</Text>

//             <Text style={[styles.paragraph, {color:theme.text}]}>
//                 Alpanet - Polskie Systemy Internetowe zobowiązuje się zapewnić dostępność swojej aplikacji mobilnej
//                 <Text style={[styles.bold, {color:theme.text}]}> 1BIP.pl</Text> zgodnie z ustawą z dnia 4 kwietnia 2019 r. o dostępności cyfrowej stron internetowych i aplikacji mobilnych podmiotów publicznych.
//             </Text>

//             <Text style={[styles.subheading, {color:theme.text}]}>1. Data publikacji i aktualizacji</Text>
//             <Text style={[styles.paragraph, {color:theme.text}]}>Data publikacji aplikacji: 19.02.2026</Text>
//             <Text style={[styles.paragraph, {color:theme.text}]}>Data ostatniej istotnej aktualizacji aplikacji: 19.02.2026</Text>
//             <Text style={[styles.paragraph, {color:theme.text}]}>Data sporządzenia deklaracji: 19.02.2026</Text>
//             <Text style={[styles.paragraph, {color:theme.text}]}>Data ostatniej aktualizacji deklaracji: 19.02.2026</Text>

//             <Text style={[styles.subheading, {color:theme.text}]}>2. Stan dostępności cyfrowej</Text>
//             <Text style={[styles.paragraph, {color:theme.text}]}>
//                 Oceniamy, że aplikacja mobilna <Text style={styles.bold}>jest częściowo</Text> zgodna z wymaganiami ustawy.
//             </Text>

//             <Text style={[styles.subheading, {color:theme.text}]}>3. Niedostępne treści i funkcje</Text>
//             <Text style={[styles.paragraph, {color:theme.text}]}>Niezgodności z wymaganiami:</Text>
//             <Text style={[styles.listItem, {color:theme.text}]}>• Niektóre elementy UI nie mają etykiet dostępności</Text>
//             <Text style={[styles.listItem, {color:theme.text}]}>• Brak wsparcia dla czytników ekranu w określonych ekranach</Text>

//             {/* <Text style={[styles.paragraph, {color:theme.text}]}>Wyłączenia:</Text>
//             <Text style={[styles.listItem, {color:theme.text}]}>• [np. elementy multimedialne bez napisów/alternatyw]</Text> */}

//             <Text style={[styles.subheading, {color:theme.text}]}>4. Metoda oceny dostępności</Text>
//             <Text style={[styles.paragraph, {color:theme.text}]}>
//                 Deklaracja została przygotowana w oparciu o samoocenę oraz testy aplikacji, zgodnie z wytycznymi WCAG 2.1/2.2.
//             </Text>

//             <Text style={[styles.subheading, {color:theme.text}]}>5. Udogodnienia i pozytywne rozwiązania</Text>
//             <Text style={[styles.listItem, {color:theme.text}]}>• Powiększenie te</Text>

//             <Text style={[styles.subheading, {color:theme.text}]}>6. Informacje zwrotne i kontakt</Text>
//             <Text style={[styles.paragraph, {color:theme.text}]}>
//                 Wszystkie problemy z dostępnością cyfrową możesz zgłaszać:
//             </Text>
//             <Text style={[styles.paragraph, {color:theme.text}]}>E-mail: <Text style={[styles.link, {color:theme.tint}]} onPress={() => Linking.openURL('mailto:adres@email.com')}>it@alpanet.pl</Text></Text>
//             <Text style={[styles.paragraph, {color:theme.text}]}>Telefon: <Text style={[styles.link, {color:theme.tint}]} onPress={() => Linking.openURL('tel:32 67 000 97')}>32 67 000 97</Text></Text>
//             <Text style={[styles.paragraph, {color:theme.text}]}>{`Adres: 42-400 Zawiercie, ul.11 Listopada 6B, woj. Śląskie`}</Text>

//             <Text style={[styles.subheading, {color:theme.text}]}>7. Dodatkowe prawa użytkownika</Text>
//             <Text style={[styles.listItem, {color:theme.text}]}>• Zażądać zapewnienia dostępności treści lub funkcji w alternatywny sposób.</Text>
//             <Text style={[styles.listItem, {color:theme.text}]}>• Złożyć skargę do kierownictwa podmiotu, jeśli odmówiono poprawy dostępności lub dostarczenia alternatywnego dostępu.</Text>

//         </ScrollView>
//     );
// };

// export default AccessDeclarationScreen;

