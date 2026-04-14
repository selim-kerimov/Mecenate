import HeartIcon from '@/assets/icons/heart.svg'
import { Palette } from '@/shared/constants'
import { StyledText } from '@/shared/ui/StyledText'
import { Image } from 'expo-image'
import { StyleSheet, View } from 'react-native'

export const CommentItem = () => {
  return (
    <View style={styles.main}>
      <Image source={require('@/assets/dev/avatar.png')} style={styles.avatar} />
      <View style={styles.text}>
        <StyledText size={15} weight={700}>
          Леша Крид
        </StyledText>
        <StyledText size={14} weight={500}>
          Хороший гайд)
        </StyledText>
      </View>

      <View style={styles.likeContainer}>
        <HeartIcon color={Palette.secondary} />
        <StyledText color="secondary" size={13} weight={700}>
          3
        </StyledText>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 40,
    height: 40,
  },
  text: {
    flex: 1,
    gap: 2,
  },
  likeContainer: {
    gap: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
})
