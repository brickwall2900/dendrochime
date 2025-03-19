import { NewsSchema, validate } from "@/data/data_validation";
import { createNews, isSuccess, News } from "@/data/something_data_utils";
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