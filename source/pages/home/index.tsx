import { Palette } from '@/shared/constants'
import { LoadingIndicator } from '@/shared/ui/LoadingIndicator'
import { PublicationCard } from '@/widgets/PublicationCard'
import { FlatList, Platform, RefreshControl, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { usePostsFeed } from './model/usePostsFeed'
import { FetchFailed } from './ui/FetchFailed'
import { Tabs } from './ui/Tabs'

export const HomePage = () => {
  const insets = useSafeAreaInsets()

  const {
    posts,
    isLoading,
    isError,
    refetch,
    isFetchingNextPage,
    handleEndReached,
    activeTab,
    setActiveTab,
    handleRefresh,
    isRefetching,
  } = usePostsFeed()

  const topOffset = insets.top + 16

  if (isError && posts.length === 0) {
    return (
      <View style={[styles.main, { paddingTop: topOffset, paddingBottom: insets.bottom }]}>
        <FetchFailed onRetry={refetch} />
      </View>
    )
  }

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id!}
      renderItem={({ item }) => <PublicationCard post={item} asLink />}
      ListHeaderComponent={
        <View style={{ gap: 16 }}>
          <Tabs value={activeTab} onChange={setActiveTab} />
        </View>
      }
      ListEmptyComponent={
        isLoading ? () => <LoadingIndicator size={24} style={{ marginTop: 32 }} /> : null
      }
      ListFooterComponent={
        isFetchingNextPage
          ? () => <LoadingIndicator size={24} style={{ marginVertical: 16 }} />
          : null
      }
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.5}
      refreshControl={
        <RefreshControl
          refreshing={isRefetching}
          onRefresh={handleRefresh}
          tintColor={Palette.accent}
          colors={[Palette.accent]}
          progressViewOffset={topOffset}
        />
      }
      style={styles.main}
      contentContainerStyle={{
        paddingTop: Platform.OS === 'android' ? topOffset : 0,
        paddingBottom: insets.bottom,
        gap: 16,
      }}
      contentInset={Platform.OS === 'ios' ? { top: topOffset } : undefined}
      contentOffset={Platform.OS === 'ios' ? { x: 0, y: -topOffset } : undefined}
      automaticallyAdjustContentInsets={false}
      showsVerticalScrollIndicator={false}
    />
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Palette.background,
  },
})
