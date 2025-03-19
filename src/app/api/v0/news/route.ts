import { NewsSchema, validate } from "@/data/data_validation";
import { createNews, DEFAULT_LIMIT, DEFAULT_PAGE, getLatestNews, isSuccess, News } from "@/data/something_data_utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest): Promise<NextResponse> {
    const thing = await request.json();
    const validation = validate(thing, NewsSchema);
    if (!validation.success) {
        return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const response = await createNews(thing as News /* TRUST ME!!! */);
    if (!isSuccess(response)) {
        return NextResponse.json({ error: response.status }, { status: response.statusCode });
    } else {
        return NextResponse.json(response.response, { status: response.statusCode });
    }
}

export async function GET(request: NextRequest): Promise<NextResponse> {
    const searchParams = request.nextUrl.searchParams;

    const pageParam = searchParams.get("page") as string;
    const limitParam = searchParams.get("limit") as string;

    let page = parseInt(pageParam);
    let limit = parseInt(limitParam);

    page = Number.isNaN(page) ? DEFAULT_PAGE : page;
    limit = Number.isNaN(limit) ? DEFAULT_LIMIT : limit;

    const response = await getLatestNews(page, limit);
    if (!isSuccess(response)) {
        return NextResponse.json({ error: response.status }, { status: response.statusCode });
    } else {
        return NextResponse.json(response.response, { status: response.statusCode });
    }
}