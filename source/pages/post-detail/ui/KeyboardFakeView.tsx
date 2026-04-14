import { Palette } from '@/shared/constants'
import { useReanimatedKeyboardAnimation } from 'react-native-keyboard-controller'
import Animated, { useAnimatedStyle } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export const KeyboardFakeView = () => {
  const insets = useSafeAreaInsets()
  const { height } = useReanimatedKeyboardAnimation()

  const style = useAnimatedStyle(() => ({
    height: Math.max(Math.abs(height.value), insets.bottom),
  }))

  return <Animated.View style={[style, { backgroundColor: Palette.white }]} />
}
