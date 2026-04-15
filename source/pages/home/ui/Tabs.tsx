import { Palette } from '@/shared/constants'
import { FontFamily } from '@/shared/constants/FontFamily'
import { Dimensions, Pressable, StyleSheet, View } from 'react-native'
import Animated, {
  interpolateColor,
  type SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

const { width: WINDOW_WIDTH } = Dimensions.get('window')
const PILL_WIDTH = (WINDOW_WIDTH - 32) / 3
const DURATION = 250

const options = [
  { title: 'Все', value: 'all' },
  { title: 'Бесплатные', value: 'free' },
  { title: 'Платные', value: 'paid' },
]

interface Props {
  value: string
  onChange: (value: string) => void
}

export const Tabs = ({ onChange, value }: Props) => {
  const translateX = useSharedValue(0)

  const pillStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }))

  const handleTabChange = (value: string, index: number) => {
    translateX.value = withTiming(PILL_WIDTH * index, { duration: DURATION })
    onChange(value)
  }

  return (
    <View style={styles.main}>
      <Animated.View pointerEvents="none" style={[styles.pill, pillStyle]} />
      {options.map((item, index) => {
        const isActive = item.value === value
        return (
          <Pressable
            key={item.value}
            style={styles.item}
            onPress={() => handleTabChange(item.value, index)}
          >
            <TabLabel
              title={item.title}
              index={index}
              isActive={isActive}
              translateX={translateX}
            />
          </Pressable>
        )
      })}
    </View>
  )
}

interface TabLabelProps {
  title: string
  index: number
  isActive: boolean
  translateX: SharedValue<number>
}

const TabLabel = ({ title, index, isActive, translateX }: TabLabelProps) => {
  const animatedStyle = useAnimatedStyle(() => {
    const position = translateX.value / PILL_WIDTH
    const distance = Math.min(Math.abs(position - index), 1)
    return {
      color: interpolateColor(distance, [0, 1], [Palette.white, Palette.textMain]),
    }
  })

  return (
    <Animated.Text style={[styles.label, { fontWeight: isActive ? '700' : '500' }, animatedStyle]}>
      {title}
    </Animated.Text>
  )
}

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    marginHorizontal: 16,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: Palette.border,
    borderRadius: 999,
    position: 'relative',
  },
  pill: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    backgroundColor: Palette.accent,
    borderRadius: 999,
    width: PILL_WIDTH,
    pointerEvents: 'none',
  },
  item: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 38,
    borderRadius: 999,
  },
  label: {
    fontFamily: FontFamily.main,
    fontSize: 13,
  },
})
