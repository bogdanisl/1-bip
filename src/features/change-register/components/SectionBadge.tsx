import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Props {
  label: string;
  variant: 'archive' | 'current';
  theme: any;
}

export function SectionBadge({ label, variant, theme }: Props) {
  const bg = variant === 'current' ? theme.tint + '22' : theme.background_2;
  const color = variant === 'current' ? theme.tint : theme.subText;

  return (
    <View style={[styles.badge, { backgroundColor: bg }]}>
      <Text style={[styles.text, { color }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  text: {
    fontSize: 12,
    fontFamily: 'Poppins-Bold',
  },
});