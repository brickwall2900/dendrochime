import { Button } from "@/components/ui/button";
import CreatePostButton from "./create-post-button";
import { getLatestNews, isSuccess, News } from "@/data/something_data_utils";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Newsroom",
};

export function NewsPiece({ news, className }: { news: News, className?: string }) {
    return (
        <li className={cn("flex flex-col border p-4 border-gray-800 rounded-xl max-w-full", className)}>
            <div className="flex flex-row justify-between">
                <Link className="text-xl hover:underline" href={`/news/${news.id}`}>{news.title}</Link>
                <p className="text-sm">Modified <time dateTime={news.dateModified.toString()}>{news.dateModified.toLocaleString()}</time></p>
            </div>

            <div className="flex flex-row">
                <q className="text-md truncate">{news.content}</q>
            </div>
        </li>
    );
}

export default async function Page() {
    const response = await getLatestNews();

    return (
        <article className="m-8 flex flex-col gap-4">
            <div className="flex flex-col md:flex-row md:justify-between justify-start">
                <h1 className="text-4xl font-bold">Newsroom</h1>
                <CreatePostButton />
            </div>
            <ul className="flex flex-col gap-4">
                {isSuccess(response) ? 
                    response.response?.map(x => <NewsPiece news={x} key={x.id}></NewsPiece>)
                    : <li>Error fetching lastest news! {response.status}</li>}
            </ul>
        </article>
    );
}