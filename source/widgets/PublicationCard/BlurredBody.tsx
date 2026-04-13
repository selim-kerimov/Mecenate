import { Palette } from '@/shared/constants'
import { StyleSheet, View } from 'react-native'

export const BlurredBody = () => {
  return (
    <View style={styles.main}>
      <View style={styles.title} />
      <View style={styles.description} />
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    gap: 8,
    paddingHorizontal: 16,
    marginTop: 8,
  },
  title: {
    backgroundColor: Palette.lightGray,
    height: 26,
    width: 164,
    borderRadius: 22,
  },
  description: {
    backgroundColor: Palette.lightGray,
    height: 40,
    width: '100%',
    borderRadius: 22,
  },
})
