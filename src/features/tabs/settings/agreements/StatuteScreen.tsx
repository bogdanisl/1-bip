import { Colors } from '@/src/constants/theme';
import React from 'react';
import { ScrollView, Text, Linking, useColorScheme } from 'react-native';
import { styles } from './styles';

const StatuteScreen = () => {
    const theme = useColorScheme() === 'dark' ? Colors.dark : Colors.light;

    return (
        <ScrollView style={[styles.container, { backgroundColor: 'transparent' }]} contentContainerStyle={styles.contentContainer}>
            <Text style={[styles.heading, { color: theme.text }]}>Regulamin – aplikacja mobilna 1BIP.pl</Text>

            <Text style={[styles.paragraph, { color: theme.text }]}>
                Alpanet - Polskie Systemy Internetowe udostępnia aplikację mobilną
                <Text style={[styles.bold, { color: theme.text }]}> 1BIP.pl</Text> na warunkach określonych w niniejszym regulaminie. Korzystanie z aplikacji oznacza akceptację tych zasad.
            </Text>

            <Text style={[styles.subheading, { color: theme.text }]}>1. Definicje</Text>
            <Text style={[styles.listItem, { color: theme.text }]}>• Użytkownik – osoba korzystająca z aplikacji mobilnej.</Text>
            <Text style={[styles.listItem, { color: theme.text }]}>• Aplikacja – aplikacja mobilna 1BIP.pl.</Text>
            <Text style={[styles.listItem, { color: theme.text }]}>• Administrator – Alpanet - Polskie Systemy Internetowe, odpowiedzialny za aplikację.</Text>

            <Text style={[styles.subheading, { color: theme.text }]}>2. Zakres regulaminu</Text>
            <Text style={[styles.paragraph, { color: theme.text }]}>
                Regulamin określa zasady korzystania z aplikacji, prawa i obowiązki użytkowników oraz administratora.
            </Text>

            <Text style={[styles.subheading, { color: theme.text }]}>3. Warunki korzystania</Text>
            <Text style={[styles.listItem, { color: theme.text }]}>• Użytkownik zobowiązuje się korzystać z aplikacji zgodnie z prawem i niniejszym regulaminem.</Text>
            <Text style={[styles.listItem, { color: theme.text }]}>• Zabronione jest podejmowanie działań mogących zakłócić działanie aplikacji lub naruszyć prawa innych użytkowników.</Text>
            <Text style={[styles.listItem, { color: theme.text }]}>• Użytkownik zobowiązuje się nie udostępniać swoich danych logowania osobom trzecim.</Text>

            <Text style={[styles.subheading, { color: theme.text }]}>4. Prawa i obowiązki administratora</Text>
            <Text style={[styles.listItem, { color: theme.text }]}>• Administrator zapewnia dostęp do aplikacji zgodnie z jej funkcjonalnością i opisem.</Text>
            <Text style={[styles.listItem, { color: theme.text }]}>• Administrator zastrzega sobie prawo do wprowadzania zmian w funkcjach aplikacji i regulaminie.</Text>
            <Text style={[styles.listItem, { color: theme.text }]}>• Administrator odpowiada za ochronę danych osobowych zgodnie z polityką prywatności.</Text>

            <Text style={[styles.subheading, { color: theme.text }]}>5. Ograniczenie odpowiedzialności</Text>
            <Text style={[styles.paragraph, { color: theme.text }]}>
                Administrator nie ponosi odpowiedzialności za przerwy w działaniu aplikacji spowodowane awariami technicznymi, niezależnymi od administratora, ani za szkody wynikłe z niewłaściwego korzystania z aplikacji przez użytkownika.
            </Text>

            <Text style={[styles.subheading, { color: theme.text }]}>6. Zgłaszanie problemów i kontakt</Text>
            <Text style={[styles.paragraph, { color: theme.text }]}>
                Wszelkie problemy związane z działaniem aplikacji oraz pytania dotyczące regulaminu można kierować do administratora:
            </Text>
            <Text style={[styles.paragraph, { color: theme.text }]}>
                E-mail: <Text style={[styles.link, { color: theme.tint }]} onPress={() => Linking.openURL('mailto:it@alpanet.pl')}>it@alpanet.pl</Text>
            </Text>
            <Text style={[styles.paragraph, { color: theme.text }]}>
                Telefon: <Text style={[styles.link, { color: theme.tint }]} onPress={() => Linking.openURL('tel:32 67 000 97')}>32 67 000 97</Text>
            </Text>

            <Text style={[styles.subheading, { color: theme.text }]}>7. Zmiany regulaminu</Text>
            <Text style={[styles.paragraph, { color: theme.text }]}>
                Administrator zastrzega sobie prawo do wprowadzania zmian w regulaminie. Aktualna wersja regulaminu zawsze będzie dostępna w aplikacji.
            </Text>
        </ScrollView>
    );
};

export default StatuteScreen;