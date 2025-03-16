import { getLatestNews, isSuccess, News } from "@/data/something_data_utils";
import { NewsPiece } from "../news/page";

export default async function LatestNews() {
    const response = await getLatestNews(0, 1);
    
    return isSuccess(response) 
        ? <NewsPiece news={(response.response as News[])[0]} className="bg-green-300" /> 
        : <p>Latest news could not be fetched! {response.status}</p>
}