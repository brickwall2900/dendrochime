import { EducationalVideo, getEducationalVideoList, isSuccess } from "@/data/something_data_utils";

function VideoThumbnail({ video }: { video: EducationalVideo }) {
    return (
        <section className="flex flex-col gap-2 border-2 border-gray-600 rounded-2xl">
            <p>UNAVAILABLE!</p>
        </section>
    );
}

export default async function Page() {
    const response = await getEducationalVideoList();

    return (
        <article className="m-8 flex flex-col gap-4">
            <div className="flex flex-col md:flex-row md:justify-between justify-start">
                <h1 className="text-3xl">Educational Videos</h1>
            </div>
            <ul className="flex flex-col gap-4">
                {isSuccess(response) ? 
                    response.response?.map(x => <VideoThumbnail video={x} key={x.title}></VideoThumbnail>)
                    : <li>Error fetching educational videos! {response.status}</li>}
            </ul>
        </article>
    );
}