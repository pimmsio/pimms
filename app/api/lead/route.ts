import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { pimms } from "@/lib/pimms";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const pimmsId = cookieStore.get("pimms_id")?.value;
    const dclid = cookieStore.get("dclid")?.value;

    const clickId = pimmsId || dclid;

    console.log("clickId", clickId);

    if (!clickId) {
      return NextResponse.json(
        { error: "No click ID found in cookies" },
        { status: 400 }
      );
    }

    const body: { eventName: string } = await request.json();

    if (!body.eventName) {
      return NextResponse.json(
        { error: "eventName is required" },
        { status: 400 }
      );
    }

    // Send the lead event to PIMMS
    await pimms.track.lead({
      clickId,
      eventName: "Click CTA",
      externalId: uuidv4(),
    });

    // Prepare the response and delete cookies
    const response = NextResponse.json(
      { message: "Lead event tracked" },
      { status: 200 }
    );

    response.cookies.set("pimms_id", "", {
      httpOnly: false,
      sameSite: "lax",
      path: "/",
      secure: false,
      domain: ".pimms.io",
      maxAge: 0,
    });
    response.cookies.set("dclid", "", {
      httpOnly: false,
      sameSite: "lax",
      path: "/",
      secure: false,
      domain: ".pimms.io",
      maxAge: 0,
    });

    return response;
  } catch (error) {
    console.error("Error tracking lead:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
