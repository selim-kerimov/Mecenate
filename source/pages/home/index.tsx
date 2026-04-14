import { Palette } from '@/shared/constants'
import { PublicationCard } from '@/widgets/PublicationCard'
import { ActivityIndicator, FlatList, StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { usePostsFeed } from './model/usePostsFeed'
import { Tabs } from './ui/Tabs'

export const HomePage = () => {
  const insets = useSafeAreaInsets()

  const { posts, isLoading, isFetchingNextPage, handleEndReached, activeTab, setActiveTab } =
    usePostsFeed()

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id!}
      renderItem={({ item }) => <PublicationCard post={item} asLink />}
      ListHeaderComponent={() => <Tabs value={activeTab} onChange={setActiveTab} />}
      ListEmptyComponent={isLoading ? () => <ActivityIndicator style={{ marginTop: 32 }} /> : null}
      ListFooterComponent={
        isFetchingNextPage ? () => <ActivityIndicator style={{ marginVertical: 16 }} /> : null
      }
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.5}
      style={styles.main}
      contentContainerStyle={{
        paddingTop: insets.top + 16,
        paddingBottom: insets.bottom,
        gap: 16,
      }}
      showsVerticalScrollIndicator={false}
    />
  )
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: Palette.background,
  },
})
