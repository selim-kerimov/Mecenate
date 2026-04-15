import { useGetPostsByIdCommentsKey } from '@/shared/openapi/queries/common'
import { getPostsByIdComments } from '@/shared/openapi/requests/sdk.gen'
import type { CommentsResponse } from '@/shared/openapi/requests/types.gen'
import { useInfiniteQuery } from '@tanstack/react-query'

const PAGE_SIZE = 10

export const useComments = (postId: string) => {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: [useGetPostsByIdCommentsKey, { postId }],
    queryFn: async ({ pageParam }) => {
      const response = await getPostsByIdComments({
        path: { id: postId },
        query: { limit: PAGE_SIZE, cursor: pageParam },
        throwOnError: true,
      })
      return response.data as CommentsResponse
    },
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) =>
      lastPage?.data?.hasMore ? (lastPage.data.nextCursor ?? undefined) : undefined,
  })

  const seen = new Set<string>()
  const comments =
    data?.pages
      .flatMap((page) => page?.data?.comments ?? [])
      .filter((c) => {
        if (!c.id || seen.has(c.id)) return false
        seen.add(c.id)
        return true
      }) ?? []

  const handleEndReached = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }

  return {
    comments,
    isLoading,
    isFetchingNextPage,
    handleEndReached,
  }
}
