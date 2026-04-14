import { useGetPostsById } from '@/shared/openapi/queries/queries'
import type { PostDetailResponse } from '@/shared/openapi/requests/types.gen'

export const usePostDetail = (id: string) => {
  const { data, isLoading } = useGetPostsById({
    path: { id },
    throwOnError: true,
  })

  const post = (data as PostDetailResponse | undefined)?.data?.post

  return { post, isLoading }
}
