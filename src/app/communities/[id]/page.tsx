import { Button } from "@/components/ui/button";
import { Community, getCommunity, getPopularCommunities, isSuccess } from "@/data/something_data_utils";
import { Group, Plus } from "lucide-react";

export async function generateStaticParams() {
    const response = await getPopularCommunities();
    if (!isSuccess(response)) {
        return [];
    } else {
        const popular = response.response;
        return popular?.map((x) => ({
            id: String(x.id)
        }));
    }
}

function CommunityPage({ community }: { community?: Community }) {
    if (!community) {
        return <p>??? community === undefined or null</p>
    }

    return (
        <div className="flex flex-col gap-1">
            <div className="flex flex-col md:flex-row md:justify-between justify-start">
                <h1 className="text-4xl font-bold">{community.name}</h1>
                <Button><Plus /> Join</Button>
            </div>
            <p>{community.description}</p>
            
            <p>Members:</p>
            <ul> { /* NO TIME TO IMPLEMENT TS */ }
                <li>Alice</li>
                <li>Bob</li>
                <li>Marga</li>
                <li>Jeff</li>
                <li>Aubrey</li>
                <li>Elly</li>
            </ul>
        </div>
    );
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const response = await getCommunity(parseInt(id));

    return (
        <div className="flex flex-col gap-4 m-8">
            { 
                isSuccess(response) 
                ? <CommunityPage community={response.response} />
                : <h1 className="text-2xl">Cannot get community page: {response.status}</h1>
            }
        </div>
    );
}