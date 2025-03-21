import { getLatestNews, getNews, isSuccess, News } from "@/data/something_data_utils";

export async function generateStaticParams() {
    const response = await getLatestNews();
    if (!isSuccess(response)) {
        return [];
    } else {
        const popular = response.response;
        return popular?.map((x) => ({
            id: String(x.id)
        }));
    }
}

function NewsPage({ news }: { news?: News }) {
    if (!news) {
        return <p>??? news === undefined or null</p>
    }

    return (
        <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-bold">{news.title}</h1>
            <h2 className="text-md">By: {news.author}</h2>
            <p className="text-sm">Created at <time dateTime={news.dateCreated.toString()}>{news.dateCreated.toLocaleString()}</time></p>
            <p className="text-sm">Modified at <time dateTime={news.dateModified.toString()}>{news.dateModified.toLocaleString()}</time></p>
            <p>{news.content}</p>
        </div>
    );
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const response = await getNews(parseInt(id));

    return (
        <div className="flex flex-col gap-4 m-8">
            { 
                isSuccess(response) 
                ? <NewsPage news={response.response} />
                : <h1 className="text-2xl">Cannot get news page: {response.status}</h1>
            }
        </div>
    );
}