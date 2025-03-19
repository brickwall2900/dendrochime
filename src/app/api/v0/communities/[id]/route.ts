import { deleteCommunity, getCommunity, isSuccess } from "@/data/something_data_utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }): Promise<NextResponse> {
    const { id } = await params;
    const idInput = parseInt(id);
    if (Number.isNaN(idInput)) {
        return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }
    const thing = await getCommunity(idInput);
    if (!isSuccess(thing)) {
        return NextResponse.json({ error: thing.status }, { status: thing.statusCode });
    } else {
        return NextResponse.json(thing.response, { status: thing.statusCode });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }): Promise<NextResponse> {
    const { id } = await params;
    const idInput = parseInt(id);
    if (Number.isNaN(idInput)) {
        return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }
    const thing = await deleteCommunity(idInput);
    return NextResponse.json(null, { status: thing.statusCode });
}