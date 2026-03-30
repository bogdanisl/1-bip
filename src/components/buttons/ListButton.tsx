// src/components/buttons/ListButton.tsx — БЕЗ NativeWind
import { hexToRgba } from '@/src/constants/theme';
import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAppTheme } from '@/src/hooks/use-theme-colors';

interface Props {
  icon?: keyof typeof FontAwesome.glyphMap;
  label: string;
  disabled?: boolean;
  onPress: () => void;
  isLast?: boolean;
  rightIcon?: keyof typeof FontAwesome.glyphMap;
  rightElement?: React.ReactNode;
}

export default function ListButton({
  icon,
  label,
  disabled = false,
  onPress,
  isLast = false,
  rightIcon = 'chevron-right',
  rightElement,
}: Props) {
  const { theme: themeColors } = useAppTheme();

  const opacity = disabled ? 0.3 : 1;
  const backgroundColor = disabled ? hexToRgba(themeColors.background, 0.5) : 'transparent';

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[
        styles.container,
        {
          borderBottomWidth: isLast ? 0 : 1,
          borderColor: themeColors.background,
          backgroundColor,
        },
      ]}
    >
      <View style={styles.left}>
        {icon && (
          <FontAwesome
            name={icon}
            size={20}
            color={hexToRgba(themeColors.tint, opacity)}
          />
        )}
        <Text
          style={[
            styles.label,
            { color: hexToRgba(themeColors.text, opacity), marginLeft: icon ? 16 : 0 },
          ]}
        >
          {label}
        </Text>
      </View>

      {rightElement ? (
        rightElement
      ) : rightIcon && rightIcon !== 'won' ? (
        <FontAwesome
          name={rightIcon}
          size={16}
          color={hexToRgba(themeColors.icon, opacity)}
        />
      ) : null}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    marginLeft: 16,
    fontSize: 16,
    fontWeight: '500',
  },
});
