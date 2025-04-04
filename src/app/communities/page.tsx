import { Community, getPopularCommunities, isSuccess } from "@/data/something_data_utils";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import Link from "next/link";

export const revalidate = 30 * 60;

export const metadata: Metadata = {
    title: "Communities",
};

export function CommunityThing( { community, className, TODO }: { community: Community, className?: string, TODO?: boolean } ) {
    return (
        <li className={cn("flex flex-col w-full border p-4 border-gray-800 rounded-xl", className)}>
            <div className="flex flex-row justify-between">
                <Link className="text-xl hover:underline" href={`/communities/${community.id}`}>{community.name}</Link>
                <p className="text-sm">{community.memberCount} {!TODO ? "members" : "views"}</p>
            </div>

            <div className="flex flex-row">
                <q className="text-md">{community.description}</q>
            </div>
        </li>
    );
}

export default async function Page() {
    const response = await getPopularCommunities();

    return (
        <article className="m-8 flex flex-col gap-4">
            <div className="flex flex-col md:flex-row md:justify-between justify-start">
                <h1 className="text-4xl font-bold">Communities</h1>
            </div>
            <p>This is the communities... JOIN ONE!!</p>
            <ul className="flex flex-col gap-4">
                {isSuccess(response) ? 
                    response.response?.map(x => <CommunityThing community={x} key={x.name}></CommunityThing>)
                    : <li>Error fetching popular communities! {response.status}</li>}
            </ul>
        </article>
    );
}