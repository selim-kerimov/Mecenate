import { Palette } from '@/shared/constants'
import { StyledText } from '@/shared/ui/StyledText'
import { Pressable, StyleSheet, View } from 'react-native'

interface Props {
  value: string
  onChange: (value: string) => void
}

export const Tabs = ({ onChange, value }: Props) => {
  return (
    <View style={styles.main}>
      {options.map((item) => {
        const isActive = item.value === value
        return (
          <Pressable
            key={item.value}
            style={[styles.item, isActive && styles.active]}
            onPress={() => onChange(item.value)}
          >
            <StyledText
              size={13}
              weight={isActive ? 700 : 500}
              color={isActive ? 'white' : 'textMain'}
            >
              {item.title}
            </StyledText>
          </Pressable>
        )
      })}
    </View>
  )
}

const options = [
  { title: 'Все', value: 'all' },
  { title: 'Бесплатные', value: 'free' },
  { title: 'Платные', value: 'paid' },
]

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    marginHorizontal: 16,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: Palette.border,
    borderRadius: 999,
  },
  item: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 38,
    borderRadius: 999,
  },
  active: {
    backgroundColor: Palette.accent,
  },
})
