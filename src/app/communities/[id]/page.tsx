import { Community, getCommunity, getPopularCommunities, isSuccess } from "@/data/something_data_utils";

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
            <h1 className="text-4xl">{community.name}</h1>
            <p>{community.description}</p>
            
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