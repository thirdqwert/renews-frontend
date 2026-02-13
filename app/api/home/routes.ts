import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ "session": 1 });
}

export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json({ created: body });
}