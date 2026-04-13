// generated with @7nohe/openapi-react-query-codegen@2.1.0 

import { type QueryClient } from "@tanstack/react-query";
import type { Options } from "../requests/sdk.gen";
import { getPosts, getPostsById, getPostsByIdComments } from "../requests/sdk.gen";
import { GetPostsByIdCommentsData, GetPostsByIdData, GetPostsData } from "../requests/types.gen";
import * as Common from "./common";
/**
* Get posts feed
*
* Paginated list of posts sorted by createdAt desc. Paid posts have empty body.
*/
export const prefetchUseGetPosts = (queryClient: QueryClient, clientOptions: Options<GetPostsData, true> = {}) => queryClient.prefetchQuery({ queryKey: Common.UseGetPostsKeyFn(clientOptions), queryFn: () => getPosts({ ...clientOptions }).then(response => response.data) });
/**
* Get post by ID
*
* Full post details. Paid posts have empty body.
*/
export const prefetchUseGetPostsById = (queryClient: QueryClient, clientOptions: Options<GetPostsByIdData, true>) => queryClient.prefetchQuery({ queryKey: Common.UseGetPostsByIdKeyFn(clientOptions), queryFn: () => getPostsById({ ...clientOptions }).then(response => response.data) });
/**
* Get comments
*
* Paginated list of comments for a post.
*/
export const prefetchUseGetPostsByIdComments = (queryClient: QueryClient, clientOptions: Options<GetPostsByIdCommentsData, true>) => queryClient.prefetchQuery({ queryKey: Common.UseGetPostsByIdCommentsKeyFn(clientOptions), queryFn: () => getPostsByIdComments({ ...clientOptions }).then(response => response.data) });
