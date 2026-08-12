import { NextResponse } from "next/server";
import { createFormToken } from "@/lib/anti-spam";

// Each token embeds its own issue time, so a cached response would hand every
// visitor the same (eventually expired) token and break the forms.
export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(
    { token: await createFormToken() },
    { headers: { "Cache-Control": "no-store, max-age=0" } },
  );
}
