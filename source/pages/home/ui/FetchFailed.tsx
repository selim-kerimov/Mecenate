import { Button } from '@/shared/ui/Button'
import { StyledText } from '@/shared/ui/StyledText'
import { Image, StyleSheet, View } from 'react-native'

interface Props {
  onRetry: () => void
}

export const FetchFailed = ({ onRetry }: Props) => {
  return (
    <View style={styles.main}>
      <Image
        source={require('@/assets/illustrations/fail.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <StyledText size={18} weight={700} style={styles.title}>
        Не удалось загрузить публикации
      </StyledText>
      <Button title="Повторить" onPress={onRetry} style={styles.button} />
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    gap: 16,
  },
  image: {
    width: 112,
    height: 112,
  },
  title: {
    textAlign: 'center',
  },
  button: {
    alignSelf: 'stretch',
  },
})
