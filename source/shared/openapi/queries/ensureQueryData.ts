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
export const ensureUseGetPostsData = (queryClient: QueryClient, clientOptions: Options<GetPostsData, true> = {}) => queryClient.ensureQueryData({ queryKey: Common.UseGetPostsKeyFn(clientOptions), queryFn: () => getPosts({ ...clientOptions }).then(response => response.data) });
/**
* Get post by ID
*
* Full post details. Paid posts have empty body.
*/
export const ensureUseGetPostsByIdData = (queryClient: QueryClient, clientOptions: Options<GetPostsByIdData, true>) => queryClient.ensureQueryData({ queryKey: Common.UseGetPostsByIdKeyFn(clientOptions), queryFn: () => getPostsById({ ...clientOptions }).then(response => response.data) });
/**
* Get comments
*
* Paginated list of comments for a post.
*/
export const ensureUseGetPostsByIdCommentsData = (queryClient: QueryClient, clientOptions: Options<GetPostsByIdCommentsData, true>) => queryClient.ensureQueryData({ queryKey: Common.UseGetPostsByIdCommentsKeyFn(clientOptions), queryFn: () => getPostsByIdComments({ ...clientOptions }).then(response => response.data) });
