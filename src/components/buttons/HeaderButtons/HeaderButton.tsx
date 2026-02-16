import { HeaderButtonProps } from "./HeaderButton.ios";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Pressable } from "react-native-gesture-handler";
import { router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function HeaderButton({ imageProps, buttonProps }: HeaderButtonProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <AnimatedPressable
      hitSlop={20}
      onPress={()=>{router.back()}} 
      onPressIn={() => {
        scale.value = withTiming(0.8);
      }}
      onPressOut={() => {
        scale.value = withTiming(1);
      }}
      style={animatedStyle}
    >
      <MaterialIcons
        // Todo: fix this type
        name={(imageProps?.systemName as any) || "cross"}
        size={24}
        color={imageProps?.color || "#ccc"}
      />
    </AnimatedPressable>
  );
}
