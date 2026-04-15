import HeartFilledIcon from '@/assets/icons/heart-filled.svg'
import HeartIcon from '@/assets/icons/heart.svg'
import { Palette } from '@/shared/constants'
import { FontFamily } from '@/shared/constants/FontFamily'
import { forwardRef, useImperativeHandle } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import Animated from 'react-native-reanimated'
import { useLike } from './useLike'

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

interface Props {
  postId: string
  initialCount: number
  initialLiked: boolean
}

export interface LikeRef {
  like: () => void
}

export const Like = forwardRef<LikeRef, Props>(function Like(
  { postId, initialCount, initialLiked },
  ref,
) {
  const {
    displayNumber,
    handlePress,
    likeIfNotLiked,
    containerStyle,
    textStyle,
    outlineIconStyle,
    filledIconStyle,
  } = useLike({ postId, initialCount, initialLiked })

  useImperativeHandle(ref, () => ({ like: likeIfNotLiked }))

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
})

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
