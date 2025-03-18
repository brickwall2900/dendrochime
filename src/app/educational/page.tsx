import { EducationalVideo, getEducationalVideoList, isSuccess } from "@/data/something_data_utils";
import Image from "next/image";

function VideoItem({ video }: { video: EducationalVideo }) {
    return (
        <li className="flex flex-row gap-4 border-2 border-gray-600 rounded-sm p-2 overflow-clip h-18 items-center">
            <Image 
                src={`https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`}
                width={320} 
                height={180} 
                alt={`Video thumbnail of ${video.title}`}
                className="w-24 h-full" />
            
            <h2 className="font-bold">{video.title}</h2>
        </li>
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
                    response.response?.map(x => <VideoItem video={x} key={x.id}></VideoItem>)
                    : <li>Error fetching educational videos! {response.status}</li>}
            </ul>
        </article>
    );
}