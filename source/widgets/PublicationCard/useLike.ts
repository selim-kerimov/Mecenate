import { Palette } from '@/shared/constants'
import { useGetPostsByIdKey, useGetPostsKey } from '@/shared/openapi/queries/common'
import { usePostPostsByIdLike } from '@/shared/openapi/queries/queries'
import type {
  LikeResponse,
  Post,
  PostDetailResponse,
  PostsResponse,
} from '@/shared/openapi/requests/types.gen'
import { useQueryClient } from '@tanstack/react-query'
import * as Haptics from 'expo-haptics'
import { useEffect, useState } from 'react'
import {
  Easing,
  interpolateColor,
  useAnimatedReaction,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated'
import { scheduleOnRN } from 'react-native-worklets'

interface UseLikeParams {
  postId: string
  initialCount: number
  initialLiked: boolean
}

export const useLike = ({ postId, initialCount, initialLiked }: UseLikeParams) => {
  const [liked, setLiked] = useState(initialLiked)
  const [displayNumber, setDisplayNumber] = useState(initialCount)

  const queryClient = useQueryClient()

  const likeMutation = usePostPostsByIdLike(undefined, {
    onSuccess: (response, variables) => {
      const result = (response as { data?: LikeResponse } | undefined)?.data?.data
      if (!result) return
      const id = variables.path.id
      const patch = (p: Post | undefined): Post | undefined =>
        p && p.id === id ? { ...p, isLiked: result.isLiked, likesCount: result.likesCount } : p

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
  })

  const targetValue = useSharedValue(initialCount)
  const animatedNumber = useSharedValue(initialCount)
  const scale = useSharedValue(1)
  const opacity = useSharedValue(1)
  const likeProgress = useSharedValue(initialLiked ? 1 : 0)

  const rounded = useDerivedValue(() => Math.round(animatedNumber.value))

  useEffect(() => {
    setLiked(initialLiked)
    setDisplayNumber(initialCount)
    targetValue.value = initialCount
    animatedNumber.value = initialCount
    likeProgress.value = initialLiked ? 1 : 0
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialLiked, initialCount])

  useAnimatedReaction(
    () => rounded.value,
    (current, previous) => {
      if (current !== previous) {
        scheduleOnRN(setDisplayNumber, current)
      }
    },
  )

  const animateLike = (nextLiked: boolean) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)

    setLiked(nextLiked)

    const newValue = nextLiked ? targetValue.value + 1 : targetValue.value - 1
    targetValue.value = newValue

    likeMutation.mutate({ path: { id: postId } })

    likeProgress.value = withTiming(nextLiked ? 1 : 0, {
      duration: 250,
      easing: Easing.out(Easing.cubic),
    })

    scale.value = withSequence(
      withTiming(0.7, { duration: 100, easing: Easing.out(Easing.quad) }),
      withSpring(1, { damping: 20, stiffness: 600, overshootClamping: true }),
    )

    opacity.value = withSequence(
      withTiming(0.6, { duration: 100, easing: Easing.out(Easing.quad) }),
      withTiming(1, { duration: 200, easing: Easing.out(Easing.cubic) }),
    )

    animatedNumber.value = withTiming(newValue, {
      duration: 280,
      easing: Easing.out(Easing.cubic),
    })
  }

  const handlePress = () => animateLike(!liked)

  const likeIfNotLiked = () => {
    if (!liked) animateLike(true)
  }

  const containerStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(likeProgress.value, [0, 1], [Palette.tertiary, Palette.pink]),
  }))

  const textStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
    color: interpolateColor(likeProgress.value, [0, 1], [Palette.secondary, Palette.white]),
  }))

  const outlineIconStyle = useAnimatedStyle(() => ({
    opacity: 1 - likeProgress.value,
  }))

  const filledIconStyle = useAnimatedStyle(() => ({
    opacity: likeProgress.value,
  }))

  return {
    displayNumber,
    handlePress,
    likeIfNotLiked,
    containerStyle,
    textStyle,
    outlineIconStyle,
    filledIconStyle,
  }
}
