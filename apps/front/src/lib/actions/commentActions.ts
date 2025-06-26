"use server";
import { print } from "graphql";
import {authFetchGraphQL, fetchGraphQL} from "@/lib/fetchGraphQL";
import {CommentEntity} from "@/lib/types/modelTypes";
import {CommentFormSchema} from "@/lib/zodSchemas/commentFormSchema";
import {CREATE_COMMENT_MUTATION, GET_POST_COMMENTS} from "../gqlQueries";
import {CreateCommentFormState} from "@/lib/types/formState";

export async function getPostComments({
                                          postId,
                                          skip,
                                          take,
                                      }: {
    postId: number;
    skip: number;
    take: number;
}) {
    const data = await fetchGraphQL(print(GET_POST_COMMENTS), {
        postId,
        take,
        skip,
    });

    return {
        comments: data.getPostComments as CommentEntity[],
        count: data.postCommentCount as number,
    };
}

export async function saveComment(
    state: CreateCommentFormState,
    formData: FormData
): Promise<CreateCommentFormState> {
    const validatedFields = CommentFormSchema.safeParse(
        Object.fromEntries(formData.entries())
    );

    if (!validatedFields.success)
        return {
            data: Object.fromEntries(formData.entries()),
            errors: validatedFields.error.flatten().fieldErrors,
        };

    const data = await authFetchGraphQL(print(CREATE_COMMENT_MUTATION), {
        input: {
            ...validatedFields.data,
        },
    });

    console.log({ data });

    if (data)
        return {
            message: "Success! Your comment saved!",
            ok: true,
            open: false,
        };

    return {
        message: "Oops! Something went wrong!",
        ok: false,
        open: true,
        data: Object.fromEntries(formData.entries()),
    };
}