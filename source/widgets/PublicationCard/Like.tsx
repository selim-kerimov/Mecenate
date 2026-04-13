import HeartFilledIcon from '@/assets/icons/heart-filled.svg'
import HeartIcon from '@/assets/icons/heart.svg'
import { Palette } from '@/shared/constants'
import { FontFamily } from '@/shared/constants/FontFamily'
import { usePostPostsByIdLike } from '@/shared/openapi/queries/queries'
import * as Haptics from 'expo-haptics'
import { useState } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import Animated, {
  Easing,
  interpolateColor,
  useAnimatedReaction,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated'
import { scheduleOnRN } from 'react-native-worklets'

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

interface Props {
  postId: string
  initialCount: number
  initialLiked: boolean
}

export const Like = ({ postId, initialCount, initialLiked }: Props) => {
  const [liked, setLiked] = useState(initialLiked)
  const [displayNumber, setDisplayNumber] = useState(initialCount)

  const likeMutation = usePostPostsByIdLike()

  const targetValue = useSharedValue(initialCount)
  const animatedNumber = useSharedValue(initialCount)
  const scale = useSharedValue(1)
  const opacity = useSharedValue(1)
  const likeProgress = useSharedValue(initialLiked ? 1 : 0)

  const rounded = useDerivedValue(() => Math.round(animatedNumber.value))

  useAnimatedReaction(
    () => rounded.value,
    (current, previous) => {
      if (current !== previous) {
        scheduleOnRN(setDisplayNumber, current)
      }
    },
  )

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)

    const nextLiked = !liked
    setLiked(nextLiked)

    const newValue = nextLiked ? targetValue.value + 1 : targetValue.value - 1
    targetValue.value = newValue

    likeMutation.mutate({ path: { id: postId } })

    likeProgress.value = withTiming(nextLiked ? 1 : 0, {
      duration: 250,
      easing: Easing.out(Easing.cubic),
    })

    scale.value = withSequence(
      withTiming(0.7, { duration: 100, easing: Easing.out(Easing.quad) }),
      withSpring(1, { damping: 20, stiffness: 600, overshootClamping: true }),
    )

    opacity.value = withSequence(
      withTiming(0.6, { duration: 100, easing: Easing.out(Easing.quad) }),
      withTiming(1, { duration: 200, easing: Easing.out(Easing.cubic) }),
    )

    animatedNumber.value = withTiming(newValue, {
      duration: 280,
      easing: Easing.out(Easing.cubic),
    })
  }

  const containerStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(likeProgress.value, [0, 1], [Palette.tertiary, Palette.pink]),
  }))

  const textStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
    color: interpolateColor(likeProgress.value, [0, 1], [Palette.secondary, Palette.white]),
  }))

  const outlineIconStyle = useAnimatedStyle(() => ({
    opacity: 1 - likeProgress.value,
  }))

  const filledIconStyle = useAnimatedStyle(() => ({
    opacity: likeProgress.value,
  }))

  return (
    <AnimatedPressable style={[styles.action, containerStyle]} onPress={handlePress}>
      <View style={styles.iconContainer}>
        <Animated.View style={outlineIconStyle}>
          <HeartIcon color={Palette.secondary} />
        </Animated.View>
        <Animated.View style={[styles.iconOverlay, filledIconStyle]}>
          <HeartFilledIcon color={Palette.white} />
        </Animated.View>
      </View>
      <Animated.Text style={[styles.text, textStyle]}>{displayNumber}</Animated.Text>
    </AnimatedPressable>
  )
}

const styles = StyleSheet.create({
  action: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    padding: 6,
    paddingRight: 12,
    borderRadius: 999,
  },
  iconContainer: {
    width: 24,
    height: 24,
  },
  iconOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  text: {
    fontSize: 13,
    fontWeight: '700',
    fontFamily: FontFamily.main,
  },
})
