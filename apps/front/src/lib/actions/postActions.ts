"use server"

import {print} from "graphql"
import {fetchGraphQL} from "@/lib/fetchGraphQL";
import {GET_POST_BY_ID, GET_POSTS} from "@/lib/gqlQueries";
import {Post} from "@/lib/types/modelTypes";
import {transformTakeSkip} from "@/lib/helpers";

export const fetchPosts = async ({page, pageSize}: {page?: number, pageSize?: number}) => {
    const {skip, take} = transformTakeSkip({page, pageSize});
    const data = await fetchGraphQL(print(GET_POSTS), {skip, take});
    return {posts: data.posts as Post[], totalPosts: data.postCount};
}

export const fetchPostById = async (id: number) => {
    const data = await fetchGraphQL(print(GET_POST_BY_ID), {id});

    return data.getPostById as Post;
}