import React, { useRef, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Animated,
    useColorScheme,
    FlatList,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, hexToRgba } from '@/constants/theme';
import { Section } from '@/types/Category';
import FileItem from '@/src/components/buttons/ItemButton';
import { Skeleton } from '@/src/components/skeleton';
import { RelativePathString, router } from 'expo-router';

const ROW_HEIGHT = 60;
const GAP = 8;
const PADDING_TOP = 20;
const ROW_HEIGHT_SUM = ROW_HEIGHT + GAP;

interface SectionCardProps {
    section: Section;
}

const SectionCard: React.FC<SectionCardProps> = ({ section }) => {
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;

    const [expanded, setExpanded] = useState(section.expanded || false);
    const animatedHeight = useRef(new Animated.Value(expanded ? ROW_HEIGHT * ((section.categories?.length || 0)) : 0)).current;
    const arrowRotation = useRef(new Animated.Value(expanded ? 1 : 0)).current;

    const toggleExpand = () => {
        const toValue = expanded ? 0 : ROW_HEIGHT_SUM * ((section.categories?.length || 0)) + PADDING_TOP;

        Animated.parallel([
            Animated.timing(animatedHeight, {
                toValue,
                duration: 300,
                useNativeDriver: false,
            }),
            Animated.timing(arrowRotation, {
                toValue: expanded ? 0 : 1,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start();

        setExpanded(!expanded);
    };

    const rotation = arrowRotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg'],
    });

    return (
        <TouchableOpacity activeOpacity={0.8} onPress={toggleExpand} style={[styles.card, { backgroundColor: theme.background_2, borderColor: theme.tint }]}>
            {/* Header */}
            <View style={[styles.header, { borderColor: theme.tint }]}>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {/* <View style={{
                        backgroundColor: theme.tint,
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 28,
                        height: 28,
                        borderRadius: 20,
                        marginRight: 10,
                    }}>
                        <Text style={{
                            color: 'white',
                            fontSize: 16,
                            fontWeight: '700',
                        }}>
                            {section.categories?.length}
                        </Text>
                    </View> */}
                    <View>
                        <Text style={[styles.titleText, { color: theme.text }]}>{section.name}</Text>
                        <Text style={{ color: theme.subText }}>{'Kategorie: ' + section.categories?.length}</Text>
                    </View>
                </View>

                <Animated.View style={{ transform: [{ rotate: rotation }], backgroundColor: hexToRgba(theme.tint, 0.0), borderRadius: 20 }}>
                    <MaterialIcons name="keyboard-arrow-down" size={28} color={theme.tint} />
                </Animated.View>
            </View>

            {/* Expandable Content */}
            <Animated.View style={{ height: animatedHeight, overflow: 'hidden' }}>

                <View style={{ paddingTop: PADDING_TOP, gap: GAP, borderTopWidth: 0.5, borderTopColor: theme.background, paddingHorizontal: 10 }}>
                    {section.categories?.map((category) => (
                        <View
                            key={category.id}
                            style={{ flexDirection: 'row' }}
                        >
                            {/* <View style={{
                                width: 15,
                                backgroundColor: theme.background,
                                borderTopLeftRadius:15,
                                paddingLeft:10,
                                paddingVertical:10,
                                borderBottomLeftRadius:15,
                            }}>
                                <View style={{
                                    backgroundColor:theme.tint,
                                    flex:1,
                                    borderRadius:10
                                }}/>
                            </View> */}
                            <FileItem
                                onPress={() => router.push({
                                    pathname: (`/(tabs)/home/categories/${category.id}` as RelativePathString),
                                    params: {
                                        title: category.title,
                                        articleCount: category.articleCount,
                                        subcategoriesCount: category.subcategoryCount
                                    }
                                })}
                                detailsAccent={`Artykuły: ${category.articleCount}`}
                                details={(category.subcategoryCount ? `Podkategorie: ${category.subcategoryCount} • ` : ``)}
                                key={category.id}
                                style={{
                                    flex: 1,
                                    // paddingLeft:10,
                                    // borderTopLeftRadius:0,
                                    // borderBottomLeftRadius:0,
                                    height: ROW_HEIGHT,
                                    backgroundColor: category.matched ? 'green' : theme.background,
                                }}
                                name={category.title}
                                rightIconName='chevron-right' />
                        </View>
                    ))}

                </View>

            </Animated.View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 15,
        overflow: 'hidden',
        elevation: 8,
    },
    header: {
        borderLeftWidth: 10,
        paddingVertical: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    titleText: {
        fontSize: 16,
        fontWeight: '700',
    },
    row: {
        paddingHorizontal: 20,
        borderTopWidth: 1,
        borderTopColor: '#FFFFFF10',
    },
    categoryText: {
        fontSize: 15,
        fontWeight: '600',
    },
});

export default SectionCard;

export const SectionCardPreloader = () => {
    const theme = useColorScheme() === 'dark' ? Colors.dark : Colors.light;
    return (
        <Skeleton borderRadius={15} width={'100%'} height={ROW_HEIGHT_SUM} theme={theme}></Skeleton>
    );
};
