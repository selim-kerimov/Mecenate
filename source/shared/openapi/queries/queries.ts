// generated with @7nohe/openapi-react-query-codegen@2.1.0 

import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from "@tanstack/react-query";
import type { Options } from "../requests/sdk.gen";
import { getPosts, getPostsById, getPostsByIdComments, postPostsByIdComments, postPostsByIdLike } from "../requests/sdk.gen";
import { GetPostsByIdCommentsData, GetPostsByIdCommentsError, GetPostsByIdData, GetPostsByIdError, GetPostsData, GetPostsError, PostPostsByIdCommentsData, PostPostsByIdCommentsError, PostPostsByIdLikeData, PostPostsByIdLikeError } from "../requests/types.gen";
import * as Common from "./common";
/**
* Get posts feed
*
* Paginated list of posts sorted by createdAt desc. Paid posts have empty body.
*/
export const useGetPosts = <TData = Common.GetPostsDefaultResponse, TError = GetPostsError, TQueryKey extends unknown[] = unknown[]>(clientOptions: Options<GetPostsData, true> = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseGetPostsKeyFn(clientOptions, queryKey), queryFn: () => getPosts({ ...clientOptions }).then(response => response.data as TData) as TData, ...options });
/**
* Get post by ID
*
* Full post details. Paid posts have empty body.
*/
export const useGetPostsById = <TData = Common.GetPostsByIdDefaultResponse, TError = GetPostsByIdError, TQueryKey extends unknown[] = unknown[]>(clientOptions: Options<GetPostsByIdData, true>, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseGetPostsByIdKeyFn(clientOptions, queryKey), queryFn: () => getPostsById({ ...clientOptions }).then(response => response.data as TData) as TData, ...options });
/**
* Get comments
*
* Paginated list of comments for a post.
*/
export const useGetPostsByIdComments = <TData = Common.GetPostsByIdCommentsDefaultResponse, TError = GetPostsByIdCommentsError, TQueryKey extends unknown[] = unknown[]>(clientOptions: Options<GetPostsByIdCommentsData, true>, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseGetPostsByIdCommentsKeyFn(clientOptions, queryKey), queryFn: () => getPostsByIdComments({ ...clientOptions }).then(response => response.data as TData) as TData, ...options });
/**
* Toggle like
*
* Like/unlike a post (toggle). Triggers a like_updated WebSocket event after 1-3s delay.
*/
export const usePostPostsByIdLike = <TData = Common.PostPostsByIdLikeMutationResult, TError = PostPostsByIdLikeError, TQueryKey extends unknown[] = unknown[], TContext = unknown>(mutationKey?: TQueryKey, options?: Omit<UseMutationOptions<TData, TError, Options<PostPostsByIdLikeData, true>, TContext>, "mutationKey" | "mutationFn">) => useMutation<TData, TError, Options<PostPostsByIdLikeData, true>, TContext>({ mutationKey: Common.UsePostPostsByIdLikeKeyFn(mutationKey), mutationFn: clientOptions => postPostsByIdLike(clientOptions) as unknown as Promise<TData>, ...options });
/**
* Add comment
*
* Create a new comment. Triggers a comment_added WebSocket event.
*/
export const usePostPostsByIdComments = <TData = Common.PostPostsByIdCommentsMutationResult, TError = PostPostsByIdCommentsError, TQueryKey extends unknown[] = unknown[], TContext = unknown>(mutationKey?: TQueryKey, options?: Omit<UseMutationOptions<TData, TError, Options<PostPostsByIdCommentsData, true>, TContext>, "mutationKey" | "mutationFn">) => useMutation<TData, TError, Options<PostPostsByIdCommentsData, true>, TContext>({ mutationKey: Common.UsePostPostsByIdCommentsKeyFn(mutationKey), mutationFn: clientOptions => postPostsByIdComments(clientOptions) as unknown as Promise<TData>, ...options });
