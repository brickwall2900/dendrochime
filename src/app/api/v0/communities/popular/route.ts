import { DEFAULT_LIMIT, DEFAULT_PAGE, getCommunity, getPopularCommunities } from "@/data/something_data_utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const pageParam = searchParams.get("page") as string;
    const limitParam = searchParams.get("limit") as string;

    let page = parseInt(pageParam);
    let limit = parseInt(limitParam);

    page = Number.isNaN(page) ? DEFAULT_PAGE : page;
    limit = Number.isNaN(limit) ? DEFAULT_LIMIT : limit;
    
    const thing = await getPopularCommunities(page, limit);
    if (!thing.response) {
        return NextResponse.json({ error: thing.status }, { status: thing.statusCode });
    } else {
        return NextResponse.json(thing.response, { status: thing.statusCode });
    }
}

// TODO: How do we create communities?