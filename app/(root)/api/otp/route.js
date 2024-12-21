import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const fixedOtp = "123456";
    const { otp } = await req.json();

    if (!otp) {
      return NextResponse.json(
        { message: "OTP is required" },
        { status: 400 }
      );
    }

    if (otp === fixedOtp) {
      return NextResponse.json({ message: "OTP is correct" }, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "OTP is invalid" },
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
