import { Image } from 'expo-image'
import LottieView from 'lottie-react-native'
import { useRef, useState } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'

interface Props {
  uri?: string
}

export const PublicImage = ({ uri }: Props) => {
  const lastTap = useRef<number | null>(null)
  const [showLottie, setShowLottie] = useState(false)
  const DOUBLE_PRESS_DELAY = 300 // milliseconds

  const playAnimation = () => {
    // Show and play lottie animation
    setShowLottie(true)

    // Remove lottie after animation completes (adjust duration as needed)
    setTimeout(() => {
      setShowLottie(false)
    }, 1000)
  }

  const handleDoublePress = (): void => {
    const now = Date.now()

    if (lastTap.current && now - lastTap.current < DOUBLE_PRESS_DELAY) {
      // Double press detected - trigger like
      lastTap.current = null // Reset

      playAnimation()
    } else {
      // Single press
      lastTap.current = now
    }
  }

  return (
    <Pressable onPress={handleDoublePress} style={styles.main}>
      <Image source={{ uri }} style={styles.image} />

      {showLottie && (
        <View style={styles.lottieContainer}>
          <LottieView
            source={require('@/assets/lottie/like.json')}
            style={styles.lottie}
            loop={false}
            autoPlay={true}
          />
        </View>
      )}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  main: {
    position: 'relative',
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  lottieContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    pointerEvents: 'none',
  },
  lottie: {
    width: 300,
    height: 300,
  },
})
