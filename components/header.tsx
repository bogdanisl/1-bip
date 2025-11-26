import { BlurView } from 'expo-blur';
import { Image, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


interface HeaderProps {
  currentRouteName: string;
  handlePresentModalPress: () => void;
  handleSheetChanges: (index: number) => void;
}

export default function Header({ currentRouteName, handlePresentModalPress }: HeaderProps) {
  //const tint = themeColors.bgMain === '#000000ff' ? 'dark' : 'light';
// Safe area
  const insets = useSafeAreaInsets();

  return (
    <BlurView
      intensity={100}
      tint={'light'}
      style={[
        styles.header,
        {
          borderColor: '#ccc',
          backgroundColor: Platform.OS === 'android' ? 'white' : 'transparent',
          // ✅ Use safe area top inset instead of fixed padding
          paddingTop: Platform.OS==='android'?0:insets.top,
        },
      ]}
    >
      {/* Left: Logo + Name */}
      <View style={styles.leftContainer}>
        <TouchableOpacity
          style={styles.logoButton}
          onPress={() => {}}
        >
          <View style={styles.logoWrapper}>
            <Image
              source={require('@/assets/images/logo_1_1_1.png')}
              style={styles.logoImage}
            />
          </View>
        </TouchableOpacity>
      </View>

      {/* Right: Picker */}
    </BlurView>
  );
}

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    minHeight:70,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingBottom: 5,
    borderBottomWidth: 1,
    zIndex: 50,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoWrapper: {
    width:150,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    elevation: 3,
  },
  logoImage: {
    width: '100%',
    height: 50,
    resizeMode: 'contain',
  },
  logoText: {
    fontWeight: 'bold',
    fontSize: 14,
    letterSpacing: 1.2,
  },
});
