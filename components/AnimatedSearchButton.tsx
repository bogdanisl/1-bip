import React, { useState, useRef, useEffect } from 'react';
import {
  Modal,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  ScrollView,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { Colors } from '@/constants/theme';
import { MaterialIcons } from '@expo/vector-icons';

interface SearchModalProps {
  visible: boolean;
  onClose: () => void;
  onSearch?: (query: string) => void; // optional callback when user presses "Szukaj"
}

const faqItems = [
  'Jak dodać cyfrowy uczniowski w aplikacji?',
  'Jak ustawić szybki dostęp do serwisów?',
  'Jak korzystać z cyfrowej karty?',
];

export default function SearchModal({ visible, onClose, onSearch }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<TextInput>(null);
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;

  const isQueryEmpty = query.trim().length === 0;

  useEffect(() => {
    if (visible) {
      setQuery(''); // clear on open
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [visible]);

  const handleSearch = () => {
    if (query.trim()) {
      onSearch?.(query.trim());
      // Optionally close modal after search
      // onClose();
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <BlurView intensity={50} tint='dark' style={StyleSheet.absoluteFill} />

          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1, justifyContent: 'flex-start', paddingTop: 50, paddingHorizontal: 20 }}
          >
            <TouchableWithoutFeedback>
              <View style={styles.container}>
                {/* Search Input Row */}
                <View style={[styles.inputRow, { backgroundColor: 'rgba(255,255,255,0.12)' }]}>
                  <MaterialIcons name="search" size={24} color={'white'} />

                  <TextInput
                    ref={inputRef}
                    value={query}
                    onChangeText={setQuery}
                    placeholder="Wyszukaj w aplikacji..."
                    placeholderTextColor={'grey'}
                    style={[styles.input, { color: 'white' }]}
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="search"
                    onSubmitEditing={handleSearch}
                  />

                  {/* Dynamic Right Button */}
                  {isQueryEmpty ? (
                    <TouchableOpacity onPress={onClose}>
                      <Text style={[styles.closeText]}>Anuluj</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity onPress={handleSearch}>
                      <Text style={[styles.searchButton]}>Szukaj</Text>
                    </TouchableOpacity>
                  )}
                </View>

                {/* FAQ - only show when query is empty */}
                {isQueryEmpty && (
                  <ScrollView style={{ marginTop: 24 }} showsVerticalScrollIndicator={false}>
                    <Text style={[styles.sectionTitle, { color: 'white' }]}>Często zadawane pytania</Text>
                    {faqItems.map((item, idx) => (
                      <TouchableOpacity key={idx} style={styles.faqItem}>
                        <Text style={[styles.faqText, { color: 'white' }]}>{item}</Text>
                        <MaterialIcons name="arrow-forward-ios" size={16} color={theme.icon} />
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                )}
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  container: {
    borderRadius: 20,
    overflow: 'hidden',
    maxHeight: '90%',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  input: {
    flex: 1,
    fontSize: 17,
    paddingVertical: 0,
  },
closeText: {
  fontWeight: '600',
  fontSize: 16,
  color:'#d8d8d8ff',
  // iOS-style glowing shadow
  textShadowColor: 'rgba(0, 0, 0, 0.35)',
  textShadowOffset: { width: 0, height: 0 },
  textShadowRadius: 8,
  // Optional extra depth (works great on dark blur background)
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.8,
  shadowRadius: 2,
  elevation: 3, // Android
},

searchButton: {
  fontWeight: '600',
  fontSize: 16,
  color:"#d8d8d8ff",
  // Same glowing effect as "Anuluj"
  textShadowColor: 'rgba(0, 0, 0, 0.35)',
  textShadowOffset: { width: 0, height: 0 },
  textShadowRadius: 8,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.8,
  shadowRadius: 2,
  elevation: 3,
},
  sectionTitle: {
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 12,
    opacity: 0.9,
  },
  faqItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  faqText: {
    fontSize: 15,
    flex: 1,
  },
});