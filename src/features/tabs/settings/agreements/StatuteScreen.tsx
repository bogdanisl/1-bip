import { Colors } from '@/src/constants/theme';
import React from 'react';
import { ScrollView, Text, Linking, useColorScheme } from 'react-native';
import { useTranslation } from 'react-i18next'; // Założenie: i18next
import { styles } from './styles';

const StatuteScreen = () => {
    const { t } = useTranslation();
    const theme = useColorScheme() === 'dark' ? Colors.dark : Colors.light;

    return (
        <ScrollView style={[styles.container, { backgroundColor: 'transparent' }]} contentContainerStyle={styles.contentContainer}>
            {/* Tytuł i Wstęp */}
            <Text style={[styles.heading, { color: theme.text }]}>
                {t('statute_text.title')}
            </Text>

            <Text style={[styles.paragraph, { color: theme.text }]}>
                {t('statute_text.intro')}
            </Text>

            {/* 1. Definicje */}
            <Text style={[styles.subheading, { color: theme.text }]}>
                {t('statute_text.definitions.title')}
            </Text>
            <Text style={[styles.listItem, { color: theme.text }]}>• {t('statute_text.definitions.user')}</Text>
            <Text style={[styles.listItem, { color: theme.text }]}>• {t('statute_text.definitions.app')}</Text>
            <Text style={[styles.listItem, { color: theme.text }]}>• {t('statute_text.definitions.admin')}</Text>
            <Text style={[styles.listItem, { color: theme.text }]}>• {t('statute_text.definitions.data')}</Text>

            {/* 2. Zakres i charakter usług */}
            <Text style={[styles.subheading, { color: theme.text }]}>
                {t('statute_text.scope.title')}
            </Text>
            <Text style={[styles.paragraph, { color: theme.text }]}>
                {t('statute_text.scope.p1')}
            </Text>
            <Text style={[styles.paragraph, { color: theme.text }]}>
                <Text style={styles.bold}>{t('statute_text.scope.p2')}</Text>
            </Text>

            {/* 3. Warunki korzystania */}
            <Text style={[styles.subheading, { color: theme.text }]}>
                {t('statute_text.terms.title')}
            </Text>
            <Text style={[styles.listItem, { color: theme.text }]}>• {t('statute_text.terms.law')}</Text>
            <Text style={[styles.listItem, { color: theme.text }]}>• {t('statute_text.terms.interruption')}</Text>
            <Text style={[styles.listItem, { color: theme.text }]}>• {t('statute_text.terms.free')}</Text>

            {/* 4. Prawa i obowiązki administratora */}
            <Text style={[styles.subheading, { color: theme.text }]}>
                {t('statute_text.rights.title')}
            </Text>
            <Text style={[styles.listItem, { color: theme.text }]}>• {t('statute_text.rights.access')}</Text>
            <Text style={[styles.listItem, { color: theme.text }]}>• {t('statute_text.rights.accuracy')}</Text>
            <Text style={[styles.listItem, { color: theme.text }]}>• {t('statute_text.rights.protection')}</Text>

            {/* 5. Ograniczenie odpowiedzialności */}
            <Text style={[styles.subheading, { color: theme.text }]}>
                {t('statute_text.liability.title')}
            </Text>
            <Text style={[styles.paragraph, { color: theme.text }]}>
                {t('statute_text.liability.text')}
            </Text>

            {/* 6. Ochrona danych osobowych */}
            <Text style={[styles.subheading, { color: theme.text }]}>
                {t('statute_text.privacy.title')}
            </Text>
            <Text style={[styles.paragraph, { color: theme.text }]}>
                {t('statute_text.privacy.text')}
                <Text 
                    style={[styles.link, { color: theme.tint }]} 
                    onPress={() => Linking.openURL('https://1bip.pl/privacy')}
                >
                    1bip.pl/polityka_prywatnosci
                </Text>
            </Text>

            {/* 7. Kontakt */}
            <Text style={[styles.subheading, { color: theme.text }]}>
                {t('statute_text.contact.title')}
            </Text>
            <Text style={[styles.paragraph, { color: theme.text }]}>
                {t('statute_text.contact.text')}
            </Text>
            <Text style={[styles.paragraph, { color: theme.text }]}>
                {t('statute_text.contact.email')}
                <Text style={[styles.link, { color: theme.tint }]} onPress={() => Linking.openURL('mailto:it@alpanet.pl')}>
                    it@alpanet.pl
                </Text>
            </Text>
            <Text style={[styles.paragraph, { color: theme.text }]}>
                {t('statute_text.contact.phone')}
                <Text style={[styles.link, { color: theme.tint }]} onPress={() => Linking.openURL('tel:326700097')}>
                    32 67 000 97
                </Text>
            </Text>

            {/* 8. Zmiany */}
            <Text style={[styles.subheading, { color: theme.text }]}>
                {t('statute_text.changes.title')}
            </Text>
            <Text style={[styles.paragraph, { color: theme.text }]}>
                {t('statute_text.changes.text')}
            </Text>
        </ScrollView>
    );
};

export default StatuteScreen;