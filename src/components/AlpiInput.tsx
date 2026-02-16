import { Colors } from '@/src/constants/theme';
import * as Haptics from 'expo-haptics';
import React, { forwardRef, useEffect } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  useColorScheme,
  View,
} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

interface AlpiInputProps extends TextInputProps {
  styles?: any;
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  errorValue?: boolean;
  errorText?: string;
  errorAnimate?: boolean;
}

const AlpiInput = forwardRef<TextInput, AlpiInputProps>(
  (
    {
      styles: customStyles,
      placeholder,
      value,
      onChangeText,
      errorValue = false,
      errorText,
      errorAnimate = false,
      secureTextEntry,
      keyboardType,
      returnKeyType,
      onSubmitEditing,
      autoCapitalize = 'none',
      ...rest
    },
    ref
  ) => {
    const themeColors = useColorScheme() === 'dark' ? Colors.dark : Colors.light;
    const shakeX = useSharedValue(0);
    const focused = useSharedValue(0);

    // Анимация placeholder при фокусе или наличии текста
    useEffect(() => {
      if (value && value.length > 0) {
        focused.value = withTiming(1, { duration: 200 });
      } else {
        focused.value = withTiming(0, { duration: 200 });
      }
    }, [value]);

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ translateX: shakeX.value }],
    }));

    const placeholderStyle = useAnimatedStyle(() => {
      return {
        position: 'absolute',
        left: 16,
        top: interpolate(focused.value, [0, 1], [16, -8], Extrapolate.CLAMP),
        fontSize: interpolate(focused.value, [0, 1], [16, 12], Extrapolate.CLAMP),
        color: themeColors.text,
        backgroundColor: 'transparent',
        paddingHorizontal: 4,
      };
    });

    // Анимация ошибки (shake + haptic)
    useEffect(() => {
      if (errorValue && errorAnimate) {
        shakeX.value = withSequence(
          withTiming(-10, { duration: 50 }),
          withTiming(10, { duration: 50 }),
          withTiming(-8, { duration: 50 }),
          withTiming(8, { duration: 50 }),
          withTiming(0, { duration: 50 })
        );
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      }
    }, [errorValue]);

    return (
      <View style={{ width: '100%', marginBottom: 16 }}>
        <Pressable
          onPress={() => ref && (ref as any).current?.focus()}
          style={{ width: '100%' }}
        >
          <Animated.View style={animatedStyle}>
            <View
              style={[
                styles.inputContainer,
                {
                  borderBottomColor: errorValue ? 'red' : 'transparent',
                  backgroundColor: themeColors.background_2,
                },
                customStyles,
              ]}
            >
              <TextInput
                ref={ref}
                
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
                returnKeyType={returnKeyType}
                onSubmitEditing={onSubmitEditing}
                autoCapitalize={autoCapitalize}
                multiline={rest.multiline}
                style={[
                  styles.input,
                  {
                    color: themeColors.text,
                    height: rest.multiline ? 100 : 50,
                    paddingVertical: rest.multiline? 10:0
                  },
                ]}
                onFocus={() => {
                  focused.value = withTiming(1, { duration: 200 });
                }}
                onBlur={() => {
                  if (!value) {
                    focused.value = withTiming(0, { duration: 200 });
                  }
                }}
                {...rest}
              />
              <Animated.Text pointerEvents="none" style={placeholderStyle}>
                {placeholder}
              </Animated.Text>
            </View>
          </Animated.View>
        </Pressable>
        {errorValue && errorText ? (
          <Text style={styles.errorText}>{errorText}</Text>
        ) : null}
      </View>
    );
  }
);

export default AlpiInput;

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 8,
    borderBottomWidth: 1, // только низ
    //paddingTop: 18, // место для плавающего placeholder
    paddingHorizontal: 16,
  },
  input: {
    height: 50,
    fontSize: 16,
    padding: 0,
    margin: 0,
  },
  errorText: {
    color: 'red',
    marginTop: 4,
    fontSize: 13,
    alignSelf: 'flex-start',
  },
});
