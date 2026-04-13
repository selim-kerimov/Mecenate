import { Palette } from '@/shared/constants'
import { useGetPostsKey } from '@/shared/openapi/queries/common'
import { getPosts } from '@/shared/openapi/requests/sdk.gen'
import type { PostsResponse } from '@/shared/openapi/requests/types.gen'
import { PublicationCard } from '@/widgets/PublicationCard'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { ActivityIndicator, FlatList, StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Tabs } from './ui/Tabs'

const PAGE_SIZE = 3

export const HomePage = () => {
  const insets = useSafeAreaInsets()
  const [activeTab, setActiveTab] = useState<string>('all')

  const tier = activeTab === 'all' ? undefined : (activeTab as 'free' | 'paid')

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: [useGetPostsKey, { tier }],
    queryFn: async ({ pageParam }) => {
      const response = await getPosts({
        query: { limit: PAGE_SIZE, cursor: pageParam, tier },
        throwOnError: true,
      })
      return response.data as PostsResponse
    },
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) =>
      lastPage?.data?.hasMore ? (lastPage.data.nextCursor ?? undefined) : undefined,
  })

  const posts = data?.pages.flatMap((page) => page?.data?.posts ?? []) ?? []

  const handleEndReached = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }

  console.log(JSON.stringify(posts, null, 2))

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id!}
      renderItem={({ item }) => <PublicationCard post={item} />}
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
