// generated with @7nohe/openapi-react-query-codegen@2.1.0 

import { UseQueryResult } from "@tanstack/react-query";
import type { Options } from "../requests/sdk.gen";
import { getPosts, getPostsById, getPostsByIdComments, postPostsByIdComments, postPostsByIdLike } from "../requests/sdk.gen";
import { GetPostsByIdCommentsData, GetPostsByIdData, GetPostsData } from "../requests/types.gen";
export type GetPostsDefaultResponse = Awaited<ReturnType<typeof getPosts>>["data"];
export type GetPostsQueryResult<TData = GetPostsDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useGetPostsKey = "GetPosts";
export const UseGetPostsKeyFn = (clientOptions: Options<GetPostsData, true> = {}, queryKey?: unknown[]) => [useGetPostsKey, ...(queryKey ?? [clientOptions])];
export type GetPostsByIdDefaultResponse = Awaited<ReturnType<typeof getPostsById>>["data"];
export type GetPostsByIdQueryResult<TData = GetPostsByIdDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useGetPostsByIdKey = "GetPostsById";
export const UseGetPostsByIdKeyFn = (clientOptions: Options<GetPostsByIdData, true>, queryKey?: unknown[]) => [useGetPostsByIdKey, ...(queryKey ?? [clientOptions])];
export type GetPostsByIdCommentsDefaultResponse = Awaited<ReturnType<typeof getPostsByIdComments>>["data"];
export type GetPostsByIdCommentsQueryResult<TData = GetPostsByIdCommentsDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useGetPostsByIdCommentsKey = "GetPostsByIdComments";
export const UseGetPostsByIdCommentsKeyFn = (clientOptions: Options<GetPostsByIdCommentsData, true>, queryKey?: unknown[]) => [useGetPostsByIdCommentsKey, ...(queryKey ?? [clientOptions])];
export type PostPostsByIdLikeMutationResult = Awaited<ReturnType<typeof postPostsByIdLike>>;
export const usePostPostsByIdLikeKey = "PostPostsByIdLike";
export const UsePostPostsByIdLikeKeyFn = (mutationKey?: unknown[]) => [usePostPostsByIdLikeKey, ...(mutationKey ?? [])];
export type PostPostsByIdCommentsMutationResult = Awaited<ReturnType<typeof postPostsByIdComments>>;
export const usePostPostsByIdCommentsKey = "PostPostsByIdComments";
export const UsePostPostsByIdCommentsKeyFn = (mutationKey?: unknown[]) => [usePostPostsByIdCommentsKey, ...(mutationKey ?? [])];
