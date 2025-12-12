import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme.web';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';

interface SkeletonProps {
  width: number | string;
  height: number;
  borderRadius?: number;
  style?: object;
}

export const Skeleton = ({ width, height, borderRadius = 8, style }: SkeletonProps) => {
  const animatedValue = useRef(new Animated.Value(-1)).current;
  const theme = useColorScheme() == 'dark'? Colors.dark : Colors.light;

  useEffect(() => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const translateX = animatedValue.interpolate({
    inputRange: [-1, 1],
    outputRange: [-200, 500],
  });

  return (
    <View style={[{ width, height, borderRadius, overflow: 'hidden', backgroundColor: theme.background_2 }, style]}>
      <Animated.View
        style={{
          flex: 1,
          transform: [{ translateX }],
        }}
      >
        <LinearGradient
          colors={[theme.background_2 ,theme.background,theme.background_2]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ flex: 1, width: 200 }}
        />
      </Animated.View>
    </View>
  );
};
