import { useGetPostsByIdCommentsKey } from '@/shared/openapi/queries/common'
import { useWebSocket, type WsEvent } from '@/shared/hooks/useWebSocket'
import type { Comment, CommentsResponse } from '@/shared/openapi/requests/types.gen'
import { useQueryClient, type InfiniteData } from '@tanstack/react-query'
import { useCallback } from 'react'

export const useCommentsWebSocket = (postId: string) => {
  const queryClient = useQueryClient()

  const handleEvent = useCallback(
    (event: WsEvent) => {
      if (event.type !== 'comment_added' || event.postId !== postId) {
        console.log(
          '[WS:Comments] Ignoring event:',
          event.type,
          'postId' in event ? (event as any).postId : '',
        )
        return
      }

      console.log('[WS:Comments] New comment received:', event)

      const newComment: Comment = {
        id: event.id,
        postId: event.postId,
        author: event.author as Comment['author'],
        text: event.text,
        createdAt: event.createdAt,
      }

      queryClient.setQueryData<InfiniteData<CommentsResponse>>(
        [useGetPostsByIdCommentsKey, { postId }],
        (old) => {
          if (!old) return old

          const firstPage = old.pages[0]
          const existingComments = firstPage?.data?.comments ?? []

          if (existingComments.some((c) => c.id === newComment.id)) {
            console.log('[WS:Comments] Duplicate comment, skipping:', newComment.id)
            return old
          }

          console.log('[WS:Comments] Adding comment to cache:', newComment.id)

          const updatedFirstPage: CommentsResponse = {
            ...firstPage,
            data: {
              ...firstPage?.data,
              comments: [newComment, ...existingComments],
            },
          }

          return {
            ...old,
            pages: [updatedFirstPage, ...old.pages.slice(1)],
          }
        },
      )
    },
    [postId, queryClient],
  )

  useWebSocket(handleEvent)
}
