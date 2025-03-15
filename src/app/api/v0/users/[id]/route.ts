import { getUser } from "@/data/something_data_utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const idInput = parseInt(id);
    if (Number.isNaN(idInput)) {
        return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }
    const thing = await getUser(idInput);
    if (!thing.response) {
        return NextResponse.json({ error: thing.status }, { status: thing.statusCode });
    } else {
        return NextResponse.json(thing.response, { status: thing.statusCode });
    }
}

// TODO: How do we create communities?