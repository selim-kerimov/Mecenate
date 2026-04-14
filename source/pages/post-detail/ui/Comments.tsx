import { StyledText } from '@/shared/ui/StyledText'
import { Pressable, StyleSheet, View } from 'react-native'

export const CommentsHeader = () => {
  return (
    <View style={styles.main}>
      <StyledText color="gray" size={15} weight={500}>
        4 комментария
      </StyledText>

      <Pressable>
        <StyledText color="accent" size={15} weight={500}>
          Сначала новые
        </StyledText>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    paddingTop: 4,
    backgroundColor: 'white',
    gap: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})
