import SubmitButton from "@/components/SubmitButton";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { deletePost, fetchPostById } from "@/lib/actions/postActions";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { redirect } from "next/navigation";

type Props = {
    params: Promise<{
        id: string;
    }>;
};
const DeletePostPage = async (props: Props) => {
    const params = await props.params;
    const post = await fetchPostById(+params.id);

    const formAction = async (formData: FormData) => {
        "use server";
        await deletePost(+params.id);
        redirect("/user/posts");
    };

    return (
        <Card className="w-96 m-12 px-6 py-6">
            <CardHeader>
                <CardTitle className="flex justify-between items-center font-thin">
                    <p className="text-red-500">Delete The Post</p>
                    <ExclamationCircleIcon className="w-8 text-red-500" />
                </CardTitle>
            </CardHeader>
            <CardDescription>
                <p>
                    This action cannot be undone. This will permanently delete your post
                    and remove its data from our servers.
                </p>
                <hr className="m-3" />
                <p className="text-slate-400 font-bold">Title of the Post</p>
                <p>{post.title}</p>
            </CardDescription>
            <CardContent>
                <form action={formAction} className="flex justify-end gap-2">
                    <Button variant={"secondary"} asChild>
                        <Link href={"/user/posts"}>Cancel</Link>
                    </Button>
                    <SubmitButton variant={"destructive"}>Delete</SubmitButton>
                </form>
            </CardContent>
        </Card>
    );
};

export default DeletePostPage;