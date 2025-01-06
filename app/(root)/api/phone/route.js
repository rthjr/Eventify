import { NextResponse } from "next/server";
export async function POST(req) {
  try {
    const fixedPhone = "0123456789";
    const { phone } = await req.json();
    if (!phone) {
      return NextResponse.json(
        { message: "Phone number is required" },
        { status: 400 }
      );
    }
    if (phone === fixedPhone) {
      return NextResponse.json(
        { message: "Phone number is correct" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Phone number is wrong" },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred" },
      { status: 500 }
    );
  }
}
