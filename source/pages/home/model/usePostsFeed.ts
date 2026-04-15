import { useGetPostsKey } from '@/shared/openapi/queries/common'
import { getPosts } from '@/shared/openapi/requests/sdk.gen'
import type { PostsResponse } from '@/shared/openapi/requests/types.gen'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useState } from 'react'

const PAGE_SIZE = 3

export const usePostsFeed = () => {
  const [isRefetching, setIsRefetching] = useState(false)
  const [activeTab, setActiveTab] = useState<string>('all')

  const tier = activeTab === 'all' ? undefined : (activeTab as 'free' | 'paid')

  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } =
    useInfiniteQuery({
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

  const handleRefresh = async () => {
    setIsRefetching(true)
    try {
      await Promise.all([refetch(), new Promise((resolve) => setTimeout(resolve, 500))])
    } finally {
      setIsRefetching(false)
    }
  }

  return {
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
  }
}
