import { Community, getPopularCommunities, isSuccess } from "@/data/something_data_utils";
import Link from "next/link";

export const revalidate = 30 * 60;

function CommunityThing( { community }: { community: Community } ) {
    return (
        <div className="flex flex-col w-full border p-4 border-gray-800 rounded-xl">
            <div className="flex flex-row justify-between">
                <Link className="text-xl hover:underline" href={`/communities/${community.id}`}>{community.name}</Link>
                <p className="text-sm">{community.memberCount} members</p>
            </div>

            <div className="flex flex-row">
                <p className="text-md">{community.description}</p>
            </div>
        </div>
    );
}

export default async function Page() {
    const response = await getPopularCommunities();

    return (
        <div className="m-8 flex flex-col gap-4">
            <div className="flex flex-col md:flex-row md:justify-between justify-start">
                <h1 className="text-3xl">Communities</h1>
            </div>
            <p>This is the communities... JOIN ONE!!</p>
            <div className="flex flex-col gap-4">
                {isSuccess(response) ? 
                    response.response?.map(x => <CommunityThing community={x} key={x.name}></CommunityThing>)
                    : <p>Error fetching popular communities! {response.status}</p>}
            </div>
        </div>
    );
}