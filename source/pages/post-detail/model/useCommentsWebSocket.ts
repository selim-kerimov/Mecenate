import { useWebSocket, type WsEvent } from '@/shared/hooks/useWebSocket'
import { useGetPostsByIdCommentsKey } from '@/shared/openapi/queries/common'
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

      if (!event.comment?.id) {
        console.log('[WS:Comments] Missing comment payload, skipping')
        return
      }

      const newComment: Comment = {
        id: event.comment.id,
        postId: event.comment.postId ?? event.postId,
        author: event.comment.author,
        text: event.comment.text,
        createdAt: event.comment.createdAt,
      }

      queryClient.setQueryData<InfiniteData<CommentsResponse>>(
        [useGetPostsByIdCommentsKey, { postId }],
        (old) => {
          if (!old || old.pages.length === 0) return old

          const alreadyExists = old.pages.some((page) =>
            (page?.data?.comments ?? []).some((c) => c.id === newComment.id),
          )
          if (alreadyExists) {
            console.log('[WS:Comments] Duplicate comment, skipping:', newComment.id)
            return old
          }

          console.log('[WS:Comments] Adding comment to cache:', newComment.id)

          const lastIndex = old.pages.length - 1
          const lastPage = old.pages[lastIndex]

          const updatedLastPage: CommentsResponse = {
            ...lastPage,
            data: {
              ...lastPage?.data,
              comments: [...(lastPage?.data?.comments ?? []), newComment],
            },
          }

          return {
            ...old,
            pages: [...old.pages.slice(0, lastIndex), updatedLastPage],
          }
        },
      )
    },
    [postId, queryClient],
  )

  useWebSocket(handleEvent)
}
