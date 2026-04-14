import { StyledText } from '@/shared/ui/StyledText'
import type { Comment } from '@/shared/openapi/requests/types.gen'
import { Image } from 'expo-image'
import { StyleSheet, View } from 'react-native'

type Props = {
  comment: Comment
}

export const CommentItem = ({ comment }: Props) => {
  return (
    <View style={styles.main}>
      <Image
        source={
          comment.author?.avatarUrl
            ? { uri: comment.author.avatarUrl }
            : require('@/assets/dev/avatar.png')
        }
        style={styles.avatar}
      />
      <View style={styles.text}>
        <StyledText size={15} weight={700}>
          {comment.author?.displayName ?? comment.author?.username ?? 'Аноним'}
        </StyledText>
        <StyledText size={14} weight={500}>
          {comment.text}
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
