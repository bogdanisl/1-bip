// src/components/forms/ContactForm.tsx — с KeyboardAwareScrollView

import { API_URL } from '@/src/constants/keys';
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view';
import { AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { showMessage } from 'react-native-flash-message';
import AlpiInput from '../../../../components/AlpiInput';
import { useSelectedBipStore } from '@/src/hooks/use-selected-bip';
import { background } from '@expo/ui/swift-ui/modifiers';
import { useAppTheme } from '@/src/hooks/use-theme-colors';

const ContactForm: React.FC<{
  endpoint?: string;
  onSubmitSuccess?: () => void;
}> = ({
  endpoint = `${API_URL}/consultation/send`,
  onSubmitSuccess,
}) => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const [consentData, setConsentData] = useState(false);
    const [consentPrivacy, setConsentPrivacy] = useState(false);
    const [loading, setLoading] = useState(false);
    const selectedBip = useSelectedBipStore((state) => state.selectedBip);
    const { theme: themeColors } = useAppTheme();
    const { t } = useTranslation();

    // errors
    const [nameError, setNameError] = useState('');
    const [surnameError, setSurnameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [messageError, setMessageError] = useState('');
    const [consentError, setConsentError] = useState('');
    const [submitError, setSubmitError] = useState('');

    const handleNameChange = (text: string) => {
      setName(text);
      if (nameError) setNameError('');
    }

    const handleSurnameChange = (text: string) => {
      setSurname(text);
      if (surnameError) setSurnameError('');
    }

    const handleEmailChange = (text: string) => {
      setEmail(text);
      if (emailError) setEmailError('');
    };

    const handlePhoneChange = (text: string) => {
      setPhone(text);
      if (phoneError) setPhoneError('');
    };

    const handleMessageChange = (text: string) => {
      setMessage(text);
      if (messageError) setMessageError('');
    };

    const validateForm = () => {
      let valid = true;

      const phoneRegex = /^\+?[0-9\s\-]+$/;
      const messageRegex = /^[\p{L}\p{N}\p{P}\p{M}\p{S}\p{Z}\p{Sc}\p{Sm}\p{Sk}\p{So}]{5,300}$/u;
      const nameRegex = /^(?=.{3,100}$)\p{L}+(?: \p{L}+)*$/u;
      const surnameRegex = /^(?=.{3,100}$)\p{L}+(?:-\p{L}+)*$/u;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      setNameError('');
      setSurnameError('');
      setEmailError('');
      setPhoneError('');
      setMessageError('');
      setConsentError('');


      if (!nameRegex.test(name.trim())) {
        setNameError(t('invalid_name_error'));
        valid = false;
      }

      if (!surnameRegex.test(surname.trim())) {
        setSurnameError(t('invalid_surname_error'));
        valid = false;
      }

      if (!emailRegex.test(email.trim())) {
        setEmailError(t('invalid_email_error'));
        valid = false;
      }

      if (!phoneRegex.test(phone.trim())) {
        setPhoneError(t('invalid_phone_error'));
        valid = false;
      }

      if (!messageRegex.test(message.trim())) {
        setMessageError(t('contact_content_error'));
        valid = false;
      }

      if (!consentData || !consentPrivacy) {
        setConsentError(t('contact_consents_error'));
        valid = false;
      }

      return valid;
    };

    const handleSubmit = async () => {
      if (!validateForm()) return;

      const payload = {
        email,
        phone,
        content: message,
        consents: [consentData ? 1 : 0, consentPrivacy ? 1 : 0],
      };

      try {
        setLoading(true);
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        //console.log(res)
        if (!res.ok) throw new Error('Błąd wysyłania formularza');


        setEmail('');
        setPhone('');
        setMessage('');
        setConsentData(false);
        setConsentPrivacy(false);

        showMessage({
          message: t('message_sent_title'),
          description: t('message_sent_desc'),
          type: 'success',
          icon: 'success',
          duration: 3000,
        });

        onSubmitSuccess?.();
      } catch (err: any) {
        setSubmitError(err.message || t('error_sending'));
        showMessage({
          message: t('error_sending_title'),
          description: t('error_sending_desc'),
          type: 'danger',
          icon: 'danger',
          duration: 3000,
        });
      } finally {
        setLoading(false);
      }
    };

    const messageLength = message.length;
    const messageMax = 300;

    return (
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollContainer}
        bounces={true}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        extraHeight={Platform.OS === 'ios' ? 150 : 150}
        enableOnAndroid={true}
        enableAutomaticScroll={true}
        keyboardOpeningTime={250}
      >
        <View style={styles.container}>
          {/* Inputs */}
          <AlpiInput
            placeholder={t('name') + "*"}
            value={name}
            onChangeText={handleNameChange}
            keyboardType='default'
            errorValue={!!nameError}
            errorText={nameError}
          />
          <AlpiInput
            placeholder={t('surname') + "*"}
            value={surname}
            onChangeText={handleSurnameChange}
            keyboardType='default'
            errorValue={!!surnameError}
            errorText={surnameError}
          />

          <AlpiInput
            placeholder="E-mail*"
            value={email}
            onChangeText={handleEmailChange}
            keyboardType="email-address"
            errorValue={!!emailError}
            errorText={emailError}
          />
          <AlpiInput
            placeholder={`${t('phone')}*`}
            value={phone}
            onChangeText={handlePhoneChange}
            keyboardType="phone-pad"
            errorValue={!!phoneError}
            errorText={phoneError}
          />

          {/* Message */}
          <View style={styles.messageContainer}>
            <Text style={[styles.messageLabel, { color: themeColors.text }]}>{t('content')}*</Text>
            <AlpiInput
              value={message}
              onChangeText={handleMessageChange}
              multiline
              errorValue={!!messageError}
              errorText={messageError}
            />
            <Text
              style={[
                styles.counter,
                { color: messageLength > messageMax ? 'red' : themeColors.text },
              ]}
            >
              {messageLength}/{messageMax}
            </Text>
          </View>

          {/* Consents */}
          <View style={styles.checkboxContainer}>
            <TouchableOpacity
              onPress={() => {
                setConsentData(!consentData);
                if (consentError) setConsentError('');
              }}
              style={styles.checkboxRow}
            >
              <View
                style={[
                  styles.checkbox,
                  {
                    borderColor: themeColors.border,
                    backgroundColor: consentData ? themeColors.text : themeColors.background,
                  },
                ]}
              >
                {consentData && <AntDesign name="check" size={14} color={themeColors.background} />}
              </View>
              <Text style={{ color: themeColors.text, paddingRight: 50 }}>{t('contact_consent_1', { company: selectedBip ? selectedBip.name : 'ALPANET - Polskie Systemy Internetowe' })}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setConsentPrivacy(!consentPrivacy);
                if (consentError) setConsentError('');
              }}
              style={styles.checkboxRow}
            >
              <View
                style={[
                  styles.checkbox,
                  {
                    borderColor: themeColors.border,
                    backgroundColor: consentPrivacy ? themeColors.text : themeColors.background,
                  },
                ]}
              >
                {consentPrivacy && <AntDesign name="check" size={14} color={themeColors.background} />}
              </View>
              <Text style={{ color: themeColors.text, paddingRight: 50 }}>{t('contact_consent_2')}</Text>
            </TouchableOpacity>
            {consentError ? <Text style={styles.errorText}>{consentError}</Text> : null}
          </View>

          {/* Submit */}
          <TouchableOpacity
            onPress={handleSubmit}
            disabled={loading}
            style={[styles.submitBtn, { backgroundColor: themeColors.tint, opacity: loading ? 0.7 : 1 }]}
          >
            <Text style={[styles.submitText, { color: themeColors.whiteText }]}>
              {loading ? t('sending...') : t('send_email')}
            </Text>
          </TouchableOpacity>
          {submitError && (

            <Text
              style={
                [styles.errorText,
                {
                  textAlign: 'center',
                  fontSize: 16,
                  marginLeft: 0,
                  marginTop: 0,
                }]}
            >
              {submitError}
            </Text>
          )
          }
        </View>
      </KeyboardAwareScrollView>
    );
  };

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    paddingHorizontal: 17,
    paddingTop: 20,
    paddingBottom: 80,
  },
  label: {
    marginBottom: 10,
    paddingLeft: 10,
    fontWeight: '600',
    fontSize: 15,
  },
  topicsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  topicButton: {
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
    margin: 4,
  },
  topicInner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  topicText: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: '500',
  },
  messageContainer: {
    marginBottom: 16,
  },
  messageLabel: {
    marginBottom: 6,
    marginLeft: 20,
    fontSize: 16,
  },
  counter: {
    fontSize: 12,
    marginLeft: 24,
    marginTop: 4,
  },
  checkboxContainer: {
    marginTop: 16,
    marginBottom: 24,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  errorText: {
    color: 'red',
    fontSize: 13,
    marginTop: 4,
    marginLeft: 32,
  },
  submitBtn: {
    paddingVertical: 14,
    width: '100%',
    borderRadius: 10,
    marginBottom: 20,
  },
  submitText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});

export default ContactForm;
