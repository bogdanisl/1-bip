// src/components/buttons/ListSwitch.tsx — БЕЗ NativeWind
import { Colors } from '@/constants/theme';
import { FontAwesome } from '@expo/vector-icons';
import { StyleSheet, Switch, Text, useColorScheme, View } from 'react-native';

interface Props {
  icon: keyof typeof FontAwesome.glyphMap;
  label: string;
  value: boolean;
  onValueChange: (val: boolean) => void;
}

export default function ListSwitch({ icon, label, value, onValueChange }: Props) {
  const colorScheme = useColorScheme();
  const themeColors = colorScheme === 'dark' ? Colors.dark : Colors.light;

  return (
    <View
      style={[
        styles.container,
        {
          borderBottomColor: themeColors.background,
          backgroundColor: themeColors.background_2,
        },
      ]}
    >
      <View style={styles.left}>
        <FontAwesome name={icon} size={20} color={themeColors.tint} />
        <Text style={[styles.label, { color: themeColors.text }]}>{label}</Text>
      </View>

      <Switch
        value={value}
        onValueChange={onValueChange}
        thumbColor='white'
        trackColor={{
          false: themeColors.background,
          true: themeColors.tint,
        }}
        ios_backgroundColor={themeColors.background}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 16,
    borderBottomWidth: 1,
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