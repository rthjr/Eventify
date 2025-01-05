import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch("https://coding-fairy.com/api/mock-api-resources/1734491523/eventify");
    if (!response.ok) {
      return NextResponse.json(
        { message: "Cannot fetch API" },
        { status: 500 }
      );
    }
    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching data", error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    console.log(body, "hjhfgjcgh")
    const response = await fetch("https://coding-fairy.com/api/mock-api-resources/1734491523/eventify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      return NextResponse.json(
        { message: "Error creating event" },
        { status: 500 }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error", error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    const body = await req.json();
    const { id, ...updateData } = body; // Extract the ID and update data

    const response = await fetch(`https://coding-fairy.com/api/mock-api-resources/1734491523/eventify/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    });

    if (!response.ok) {
      return NextResponse.json(
        { message: "Error updating event" },
        { status: 400 }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error", error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    const body = await req.json();
    const { id } = body;

    const response = await fetch(`https://coding-fairy.com/api/mock-api-resources/1734491523/eventify/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      return NextResponse.json(
        { message: "Error deleting event" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Event deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error", error: error.message },
      { status: 500 }
    );
  }
}
