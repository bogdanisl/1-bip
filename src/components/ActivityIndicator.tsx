import { Colors } from '@/src/constants/theme';
import React, { useEffect, useRef } from 'react';
import { Animated, DimensionValue, Easing, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useAppTheme } from '../hooks/use-theme-colors';

interface ImagePreloaderProps {
    width?: DimensionValue;
    height?: DimensionValue;
    size?: number;
    color?: string;
    style?: StyleProp<ViewStyle>
}

export default function ActivityIndicator({ width = 100, height = 100, size = 25, style }: ImagePreloaderProps) {
    const { theme } = useAppTheme();
    const outerSpin = useRef(new Animated.Value(0)).current;
    const innerSpin = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        Animated.loop(
            Animated.timing(outerSpin, {
                toValue: 1,
                duration: 1200,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start();

        Animated.loop(
            Animated.timing(innerSpin, {
                toValue: 1,
                duration: 1200,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start();
    }, []);

    const outerRotate = outerSpin.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    const innerRotate = innerSpin.interpolate({
        inputRange: [0, 1],
        outputRange: ['360deg', '0deg'],
    });

    return (
        <View style={[{ width, height, justifyContent: 'center', alignItems: 'center' }, style]}>
            {/* Outer spinner */}
            <Animated.View style={{ transform: [{ rotate: outerRotate }] }}>
                <Svg width={size} height={size} viewBox="0 0 100 100">
                    <Path d="M50 10 A40 40 0 0 1 90 50" stroke={theme.tint} strokeWidth={4} strokeLinecap="round" fill="none" />
                    <Path d="M50 90 A40 40 0 0 1 10 50" stroke={theme.tint} strokeWidth={4} strokeLinecap="round" fill="none" />
                </Svg>
            </Animated.View>

            {/* Inner spinner */}
            <Animated.View
                style={{
                    position: 'absolute',
                    transform: [{ rotate: innerRotate }],
                }}
            >
                <Svg width={size} height={size} viewBox="0 0 100 100">
                    <Path d="M50 30 A20 20 0 0 1 70 50" stroke={theme.text} strokeWidth={3} strokeLinecap="round" fill="none" />
                    <Path d="M50 70 A20 20 0 0 1 30 50" stroke={theme.text} strokeWidth={3} strokeLinecap="round" fill="none" />
                </Svg>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});
