import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useAppTheme } from '../hooks/use-theme-colors';

type EmptyStateProps = {
  /**
    * Material icon name to show as the main illustration.
    * Default: "inbox" (a neutral empty-state icon).
    */
  iconName?: keyof typeof MaterialIcons.glyphMap;

  /**
   * Title text shown under the icon.
   * Default: i18n translation for 'no_data'.
   */
  title?: string;

  /**
   * Description text shown below the title.
   * Default: i18n translation for 'check_later_or_update'.
   */
  description?: string;

  /**
   * Text for the optional refresh button.
   * Default: i18n translation for 'update_list'.
   */
  buttonText?: string;

  /**
   * Callback executed when the refresh button is pressed.
   * If not provided, the button is hidden.
   */
  onRefresh?: () => void;

  /**
   * Loading state for the button.
   * If true, the button is disabled and opacity is reduced.
   */
  loading?: boolean;
};

/**
 * Reusable empty state component for lists/screens with no data.
 * Automatically uses i18n translations if title/description/buttonText are not provided.
 * Hides the button if `onRefresh` is not passed.
 */
export const EmptyState: React.FC<EmptyStateProps> = ({
  iconName = 'inbox',
  title,
  description,
  buttonText,
  onRefresh,
  loading = false,
}) => {
  const { t } = useTranslation();
  const { theme } = useAppTheme();

  // 🔹 Default translations
  const resolvedTitle = title ?? t('no_data');
  const resolvedDescription =
    description ?? t('check_later_or_update');
  const resolvedButtonText =
    buttonText ?? t('update_list');

  return (
    <View style={styles.container}>
      <MaterialIcons
        name={iconName}
        color={theme.tint}
        size={140}
      />

      <Text style={[styles.title, { color: theme.text }]}>
        {resolvedTitle}
      </Text>

      <Text
        style={[styles.description, { color: theme.subText }]}
      >
        {resolvedDescription}
      </Text>

      {onRefresh && (
        <TouchableOpacity
          onPress={onRefresh}
          disabled={loading}
          style={[
            styles.button,
            {
              borderColor: theme.subText,
              opacity: loading ? 0.6 : 1,
            },
          ]}
        >
          <Text
            style={[
              styles.buttonText,
              { color: theme.tint },
            ]}
          >
            {resolvedButtonText.toUpperCase()}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '800',
    marginTop: 10,
    marginBottom: 10,
  },
  description: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '600',
  },
  button: {
    marginVertical: 50,
    paddingVertical: 15,
    paddingHorizontal: 35,
    borderWidth: 1,
    borderRadius: 25,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '700',
  },
});