import { getId, isSuccess } from "@/data/something_data_utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
    const response = await getId();
    if (!isSuccess(response)) {
        return NextResponse.json({ error: response.status }, { status: response.statusCode });
    } else {
        return NextResponse.json(response.response, { status: response.statusCode });
    }
}