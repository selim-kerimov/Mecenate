import { useGetPostsByIdCommentsKey, usePostPostsByIdComments } from '@/shared/openapi/queries'
import { useQueryClient } from '@tanstack/react-query'

export const useCommentCreate = (id: string | undefined) => {
  const queryClient = useQueryClient()
  const createComment = usePostPostsByIdComments()

  const handleSubmitComment = (text: string) => {
    if (!id) return
    createComment.mutate(
      { path: { id }, body: { text } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [useGetPostsByIdCommentsKey, { postId: id }] })
        },
      },
    )
  }

  return handleSubmitComment
}
