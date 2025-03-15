import { Community } from "@/data/something_data_utils";

function CommunityThing(community: Community) {
    
}

export default function Page() {
    return (
        <div className="m-8 flex flex-col gap-4">
            <div className="flex flex-col md:flex-row md:justify-between justify-start">
                <h1 className="text-3xl">Communities</h1>
            </div>
            <p>This is the communities... JOIN ONE!!</p>
        </div>
    );
}