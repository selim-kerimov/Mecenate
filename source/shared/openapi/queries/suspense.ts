// generated with @7nohe/openapi-react-query-codegen@2.1.0 

import { useSuspenseQuery, UseSuspenseQueryOptions } from "@tanstack/react-query";
import type { Options } from "../requests/sdk.gen";
import { getPosts, getPostsById, getPostsByIdComments } from "../requests/sdk.gen";
import { GetPostsByIdCommentsData, GetPostsByIdCommentsError, GetPostsByIdData, GetPostsByIdError, GetPostsData, GetPostsError } from "../requests/types.gen";
import * as Common from "./common";
/**
* Get posts feed
*
* Paginated list of posts sorted by createdAt desc. Paid posts have empty body.
*/
export const useGetPostsSuspense = <TData = NonNullable<Common.GetPostsDefaultResponse>, TError = GetPostsError, TQueryKey extends unknown[] = unknown[]>(clientOptions: Options<GetPostsData, true> = {}, queryKey?: TQueryKey, options?: Omit<UseSuspenseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseGetPostsKeyFn(clientOptions, queryKey), queryFn: () => getPosts({ ...clientOptions }).then(response => response.data as TData) as TData, ...options });
/**
* Get post by ID
*
* Full post details. Paid posts have empty body.
*/
export const useGetPostsByIdSuspense = <TData = NonNullable<Common.GetPostsByIdDefaultResponse>, TError = GetPostsByIdError, TQueryKey extends unknown[] = unknown[]>(clientOptions: Options<GetPostsByIdData, true>, queryKey?: TQueryKey, options?: Omit<UseSuspenseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseGetPostsByIdKeyFn(clientOptions, queryKey), queryFn: () => getPostsById({ ...clientOptions }).then(response => response.data as TData) as TData, ...options });
/**
* Get comments
*
* Paginated list of comments for a post.
*/
export const useGetPostsByIdCommentsSuspense = <TData = NonNullable<Common.GetPostsByIdCommentsDefaultResponse>, TError = GetPostsByIdCommentsError, TQueryKey extends unknown[] = unknown[]>(clientOptions: Options<GetPostsByIdCommentsData, true>, queryKey?: TQueryKey, options?: Omit<UseSuspenseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseGetPostsByIdCommentsKeyFn(clientOptions, queryKey), queryFn: () => getPostsByIdComments({ ...clientOptions }).then(response => response.data as TData) as TData, ...options });
