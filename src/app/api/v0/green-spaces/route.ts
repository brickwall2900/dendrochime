import { GreenSpaceSchema, validate } from "@/data/data_validation";
import { addGreenSpace, getGreenSpaces, GreenSpace, isSuccess } from "@/data/something_data_utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
    const response = await getGreenSpaces();
    if (!isSuccess(response)) {
        return NextResponse.json({ error: response.status }, { status: response.statusCode });
    } else {
        return NextResponse.json(response.response, { status: response.statusCode });
    }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
    const thing = await request.json();
    const validation = validate(thing, GreenSpaceSchema);
    if (!validation.success) {
        return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const response = await addGreenSpace(thing as GreenSpace);
    if (!isSuccess(response)) {
        return NextResponse.json({ error: response.status }, { status: response.statusCode });
    } else {
        return NextResponse.json(response.response, { status: response.statusCode });
    }
}