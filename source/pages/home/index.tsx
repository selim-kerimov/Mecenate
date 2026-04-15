import { Palette } from '@/shared/constants'
import { PublicationCard } from '@/widgets/PublicationCard'
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { usePostsFeed } from './model/usePostsFeed'
import { Tabs } from './ui/Tabs'

export const HomePage = () => {
  const insets = useSafeAreaInsets()

  const {
    posts,
    isLoading,
    isFetchingNextPage,
    handleEndReached,
    activeTab,
    setActiveTab,
    handleRefresh,
    isRefetching,
  } = usePostsFeed()

  return (
    <View style={[styles.main, { paddingTop: insets.top + 16 }]}>
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
          isLoading ? () => <ActivityIndicator style={{ marginTop: 32 }} /> : null
        }
        ListFooterComponent={
          isFetchingNextPage ? () => <ActivityIndicator style={{ marginVertical: 16 }} /> : null
        }
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={handleRefresh}
            tintColor={Palette.accent}
            colors={[Palette.accent]}
          />
        }
        contentContainerStyle={{
          paddingBottom: insets.bottom,
          gap: 16,
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Palette.background,
  },
})
