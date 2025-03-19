import { NewsPatchSchema, validate } from "@/data/data_validation";
import { deleteNews, getNews, isSuccess, updateNews } from "@/data/something_data_utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }): Promise<NextResponse> {
    const { id } = await params;
    const idInput = parseInt(id);
    if (Number.isNaN(idInput)) {
        return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }
    const thing = await getNews(idInput);
    if (!isSuccess(thing)) {
        return NextResponse.json({ error: thing.status }, { status: thing.statusCode });
    } else {
        return NextResponse.json(thing.response, { status: thing.statusCode });
    }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }): Promise<NextResponse> {
    // TODO: CHECK FOR USER PERMISSION!!
    const { id } = await params;
    const idInput = parseInt(id);
    if (Number.isNaN(idInput)) {
        return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const thing = await request.json();
    const validation = validate(thing, NewsPatchSchema);
    if (!validation.success) {
        return NextResponse.json({ error: validation.error }, { status: 400 });
    }
    const response = await updateNews(idInput, thing.title, thing.content);
    if (!isSuccess(response)) {
        return NextResponse.json({ error: response.status }, { status: response.statusCode });
    } else {
        return NextResponse.json(response.response, { status: response.statusCode });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }): Promise<NextResponse> {
    const { id } = await params;
    const idInput = parseInt(id);
    if (Number.isNaN(idInput)) {
        return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }
    const thing = await deleteNews(idInput);
    return NextResponse.json(null, { status: thing.statusCode });
}