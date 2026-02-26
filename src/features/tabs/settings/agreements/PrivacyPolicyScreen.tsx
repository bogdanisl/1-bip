import WebViewScreen from "@/src/features/webView/WebViewScreen";
import { useSelectedBipStore } from "@/src/hooks/use-selected-bip";
import { useTranslation } from "react-i18next";

export default function PrivacyPolicyScreen() {
    const selectedBip = useSelectedBipStore((s) => s.selectedBip);
    const { t } = useTranslation();
    return <WebViewScreen link={`${selectedBip?.url}/polityka_prywatnosci`} name={t('access_declaration')} />
}

// import { Colors } from '@/src/constants/theme';
// import React from 'react';
// import { ScrollView, Text, Linking, useColorScheme } from 'react-native';
// import { styles } from './styles';

// const PrivacyPolicyScreen = () => {
//     const theme = useColorScheme() === 'dark' ? Colors.dark : Colors.light;

//     return (
//         <ScrollView style={[styles.container, { backgroundColor: 'transparent' }]} contentContainerStyle={styles.contentContainer}>
//             <Text style={[styles.heading, { color: theme.text }]}>Polityka Prywatności – aplikacja mobilna 1BIP.pl</Text>

//             <Text style={[styles.paragraph, { color: theme.text }]}>
//                 Alpanet - Polskie Systemy Internetowe szanuje Twoją prywatność i zobowiązuje się chronić wszelkie dane osobowe użytkowników aplikacji mobilnej
//                 <Text style={[styles.bold, { color: theme.text }]}> 1BIP.pl</Text> zgodnie z obowiązującymi przepisami prawa, w tym RODO.
//             </Text>

//             <Text style={[styles.subheading, { color: theme.text }]}>1. Administrator danych</Text>
//             <Text style={[styles.paragraph, { color: theme.text }]}>
//                 Administratorem danych osobowych użytkowników aplikacji jest Alpanet - Polskie Systemy Internetowe, ul. 11 Listopada 6B, 42-400 Zawiercie, woj. Śląskie.
//             </Text>

//             <Text style={[styles.subheading, { color: theme.text }]}>2. Jakie dane zbieramy</Text>
//             <Text style={[styles.listItem, { color: theme.text }]}>• Dane podane dobrowolnie przez użytkownika (np. e-mail, imię, nazwisko przy kontaktach lub zgłoszeniach).</Text>
//             <Text style={[styles.listItem, { color: theme.text }]}>• Dane techniczne urządzenia i systemu (np. model urządzenia, system operacyjny, wersja aplikacji).</Text>
//             <Text style={[styles.listItem, { color: theme.text }]}>• Dane związane z korzystaniem z aplikacji (np. logi błędów, statystyki użycia).</Text>

//             <Text style={[styles.subheading, { color: theme.text }]}>3. Cele przetwarzania danych</Text>
//             <Text style={[styles.listItem, { color: theme.text }]}>• Świadczenie usług dostępnych w aplikacji i poprawa jakości aplikacji.</Text>
//             <Text style={[styles.listItem, { color: theme.text }]}>• Realizacja obowiązków prawnych podmiotu publicznego.</Text>
//             <Text style={[styles.listItem, { color: theme.text }]}>• Obsługa kontaktu i zgłoszeń użytkowników.</Text>

//             <Text style={[styles.subheading, { color: theme.text }]}>4. Udostępnianie danych</Text>
//             <Text style={[styles.paragraph, { color: theme.text }]}>
//                 Dane użytkowników nie są udostępniane podmiotom trzecim poza przypadkami przewidzianymi prawem lub gdy jest to niezbędne do świadczenia usług aplikacji.
//             </Text>

//             <Text style={[styles.subheading, { color: theme.text }]}>5. Okres przechowywania danych</Text>
//             <Text style={[styles.paragraph, { color: theme.text }]}>
//                 Dane osobowe będą przechowywane przez okres niezbędny do realizacji celów, w tym świadczenia usług i wypełnienia obowiązków prawnych.
//             </Text>

//             <Text style={[styles.subheading, { color: theme.text }]}>6. Prawa użytkownika</Text>
//             <Text style={[styles.listItem, { color: theme.text }]}>• Prawo dostępu do swoich danych.</Text>
//             <Text style={[styles.listItem, { color: theme.text }]}>• Prawo do poprawienia, usunięcia lub ograniczenia przetwarzania danych.</Text>
//             <Text style={[styles.listItem, { color: theme.text }]}>• Prawo do wniesienia sprzeciwu wobec przetwarzania danych.</Text>
//             <Text style={[styles.listItem, { color: theme.text }]}>• Prawo do przenoszenia danych.</Text>
//             <Text style={[styles.listItem, { color: theme.text }]}>• Prawo do wniesienia skargi do organu nadzorczego.</Text>

//             <Text style={[styles.subheading, { color: theme.text }]}>7. Kontakt w sprawie danych osobowych</Text>
//             <Text style={[styles.paragraph, { color: theme.text }]}>
//                 Wszelkie pytania dotyczące przetwarzania danych osobowych możesz kierować do:
//             </Text>
//             <Text style={[styles.paragraph, { color: theme.text }]}>
//                 E-mail: <Text style={[styles.link, { color: theme.tint }]} onPress={() => Linking.openURL('mailto:it@alpanet.pl')}>it@alpanet.pl</Text>
//             </Text>
//             <Text style={[styles.paragraph, { color: theme.text }]}>
//                 Telefon: <Text style={[styles.link, { color: theme.tint }]} onPress={() => Linking.openURL('tel:32 67 000 97')}>32 67 000 97</Text>
//             </Text>

//             <Text style={[styles.subheading, { color: theme.text }]}>8. Zmiany polityki prywatności</Text>
//             <Text style={[styles.paragraph, { color: theme.text }]}>
//                 Polityka prywatności może ulec zmianie. Aktualna wersja zawsze będzie dostępna w aplikacji.
//             </Text>
//         </ScrollView>
//     );
// };

// export default PrivacyPolicyScreen;