import { headers } from "next/headers";
import { NextResponse } from "next/server";

import type { BillingCurrency } from "@/lib/pricing";

const USD_COUNTRY_CODES = [
  "US", "PR", "GU", "VI", "AS", "MP", "UM",
  "EC", "SV", "PA", "TL", "ZW", "MH", "FM", "PW",
];

export async function GET() {
  const headersList = await headers();
  const country = headersList.get("x-vercel-ip-country")?.toUpperCase() ?? null;

  const currency: BillingCurrency =
    country && USD_COUNTRY_CODES.includes(country) ? "USD" : "EUR";

  return NextResponse.json({ currency, country: country ?? undefined });
}
