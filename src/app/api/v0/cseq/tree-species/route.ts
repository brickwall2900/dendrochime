import { DEFAULT_LIMIT, DEFAULT_PAGE, getTreeSpecies, isSuccess } from "@/data/something_data_utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
    const searchParams = request.nextUrl.searchParams;

    const queryParam = searchParams.get("q") as string;
    const pageParam = searchParams.get("page") as string;
    const limitParam = searchParams.get("limit") as string;

    let query = queryParam || "";
    let page = parseInt(pageParam);
    let limit = parseInt(limitParam);

    page = Number.isNaN(page) ? DEFAULT_PAGE : page;
    limit = Number.isNaN(limit) ? DEFAULT_LIMIT : limit;

    const response = await getTreeSpecies(query, page, limit);
    if (!isSuccess(response)) {
        return NextResponse.json({ error: response.status }, { status: response.statusCode });
    } else {
        return NextResponse.json(response.response, { status: response.statusCode });
    }
}