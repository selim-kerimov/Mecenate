import { useWebSocket, WsEvent } from '@/shared/hooks/useWebSocket'
import { useGetPostsByIdKey, useGetPostsKey } from '@/shared/openapi/queries/common'
import type { Post, PostDetailResponse, PostsResponse } from '@/shared/openapi/requests/types.gen'
import { useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'

export const useLikeWebSocket = () => {
  const queryClient = useQueryClient()

  const handleEvent = useCallback(
    (event: WsEvent) => {
      if (event.type !== 'like_updated') return

      const { postId, likesCount } = event

      const patch = (p: Post | undefined): Post | undefined =>
        p && p.id === postId ? { ...p, likesCount } : p

      queryClient.setQueriesData<PostDetailResponse>({ queryKey: [useGetPostsByIdKey] }, (old) => {
        if (!old?.data?.post) return old
        const next = patch(old.data.post)
        return next === old.data.post ? old : { ...old, data: { ...old.data, post: next } }
      })

      queryClient.setQueriesData<{ pages: PostsResponse[]; pageParams: unknown[] }>(
        { queryKey: [useGetPostsKey] },
        (old) => {
          if (!old?.pages) return old
          return {
            ...old,
            pages: old.pages.map((page) => ({
              ...page,
              data: page?.data
                ? { ...page.data, posts: page.data.posts?.map((p) => patch(p)!) }
                : page?.data,
            })),
          }
        },
      )
    },
    [queryClient],
  )

  useWebSocket(handleEvent)
}
