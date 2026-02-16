// app/components/CategoriesSection.tsx
import { Br } from '@/src/components/Br';
import React from 'react';
import { View, Text } from 'react-native';

interface Props {
    categories: string[];
    theme: any;
}

export function CategoriesSection({ categories, theme }: Props) {
    return (
        <View style={{ marginVertical: 16 }}>
            <Text style={{ color: theme.text, fontSize: 15, fontWeight: '800', paddingVertical: 12 }}>
                {('Kategorie').toUpperCase()}
            </Text>
            <Br />
            <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
                {categories.map(cat => (
                    <View key={cat} style={{ backgroundColor: theme.inactive, paddingHorizontal: 10, paddingVertical: 8, borderRadius: 16 }}>
                        <Text style={{ color: theme.text,fontWeight: 600,}}>{cat}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
}
