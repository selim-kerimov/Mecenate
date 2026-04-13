import BubbleIcon from '@/assets/icons/bubble.svg'
import { Palette } from '@/shared/constants'
import type { Post } from '@/shared/openapi/requests/types.gen'
import { StyledText } from '@/shared/ui/StyledText'
import { Image } from 'expo-image'
import { useRef } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { BlurredBody } from './BlurredBody'
import { BlurredImage } from './BlurredImage'
import { Description } from './Description'
import { Like, LikeRef } from './Like'
import { PublicImage } from './PublicationImage'

interface Props {
  post: Post
}

export const PublicationCard = ({ post }: Props) => {
  const likeRef = useRef<LikeRef>(null)
  const isPaid = post.tier === 'paid'

  return (
    <View style={styles.main}>
      <View style={styles.header}>
        <Image source={{ uri: post.author?.avatarUrl }} style={styles.avatar} />
        <StyledText size={15} weight={700}>
          {post.author?.displayName}
        </StyledText>
      </View>

      {isPaid ? (
        <BlurredImage uri={post.coverUrl} />
      ) : (
        <PublicImage uri={post.coverUrl} onDoubleTap={() => likeRef.current?.like()} />
      )}

      {isPaid ? (
        <BlurredBody />
      ) : (
        <View style={styles.body}>
          <View style={{ gap: 8 }}>
            <StyledText weight={700} size={17}>
              {post.title}
            </StyledText>
            <Description preview={post.preview} body={post.body} />
          </View>

          <View style={styles.bottom}>
            <Like
              ref={likeRef}
              postId={post.id!}
              initialCount={post.likesCount ?? 0}
              initialLiked={post.isLiked ?? false}
            />
            <Pressable style={styles.action}>
              <BubbleIcon color={Palette.secondary} />
              <StyledText size={13} weight={700} color="secondary">
                {post.commentsCount ?? 0}
              </StyledText>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    paddingVertical: 12,
    backgroundColor: Palette.white,
  },
  header: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingBottom: 16,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  body: {
    paddingHorizontal: 16,
    marginTop: 8,
    gap: 16,
  },
  bottom: {
    flexDirection: 'row',
    gap: 8,
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    padding: 6,
    paddingRight: 12,
    backgroundColor: Palette.tertiary,
    borderRadius: 999,
  },
})
