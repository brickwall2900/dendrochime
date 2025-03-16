import { Community, getPopularCommunities, isSuccess } from "@/data/something_data_utils";
import { CommunityThing } from "../communities/page";

export default async function TopCommunity() {
    const response = await getPopularCommunities(0, 1);
    
    return isSuccess(response) 
        ? <CommunityThing community={(response.response as Community[])[0]} className="bg-green-300" /> 
        : <p>Top Commuity could not be fetched! {response.status}</p>
}