import { Palette } from '@/shared/constants'
import { PublicationCard } from '@/widgets/PublicationCard'
import { useLocalSearchParams } from 'expo-router'
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useComments } from './model/useComments'
import { useCommentsWebSocket } from './model/useCommentsWebSocket'
import { usePostDetail } from './model/usePostDetail'
import { CommentItem } from './ui/CommentItem'
import { CommentsHeader } from './ui/Comments'
import { KeyboardFakeView } from './ui/KeyboardFakeView'
import { NewCommentForm } from './ui/NewCommentForm'

export const PostDetailPage = () => {
  const { id } = useLocalSearchParams<{ id: string }>()
  const insets = useSafeAreaInsets()
  const { post, isLoading } = usePostDetail(id!)
  const { comments, isFetchingNextPage, handleEndReached } = useComments(id!)
  useCommentsWebSocket(id!)

  if (isLoading) {
    return <ActivityIndicator style={{ flex: 1, backgroundColor: Palette.background }} />
  }

  if (!post) return null

  return (
    <View style={styles.container}>
      <FlatList
        data={comments}
        keyExtractor={(item) => item.id!}
        renderItem={({ item }) => <CommentItem comment={item} />}
        ListHeaderComponent={() => (
          <>
            <PublicationCard post={post} />
            <CommentsHeader count={post.commentsCount ?? 0} />
          </>
        )}
        ListFooterComponent={() =>
          isFetchingNextPage ? (
            <ActivityIndicator style={{ paddingVertical: 12 }} />
          ) : (
            <View style={styles.bottomPadding} />
          )
        }
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        style={styles.main}
        contentContainerStyle={{
          paddingTop: insets.top,
          paddingBottom: 8,
        }}
        showsVerticalScrollIndicator={false}
      />

      <NewCommentForm postId={id} />
      <KeyboardFakeView />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  main: {
    flex: 1,
    backgroundColor: Palette.background,
  },
  bottomPadding: {
    height: 12,
    borderBottomEndRadius: 12,
    borderBottomStartRadius: 12,
    backgroundColor: 'white',
  },
})
