import { cookies } from "next/headers";
import { redirect, RedirectType } from "next/navigation";
import { NextRequest } from "next/server";
import Stripe from "stripe";
import { getPriceIdForCheckout, type BillingPeriod, type PaidPlanId } from "@/lib/pricing";

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const pimmsId = cookieStore.get("pimms_id")?.value;
  const dclid = cookieStore.get("dclid")?.value;

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const plan = searchParams.get("plan") as PaidPlanId | null;
  const period = searchParams.get("period") as BillingPeriod | null;

  const clickId = pimmsId || dclid;

  // Backward compatible: legacy Stripe Payment Links (buy.stripe.com/{id})
  if (id) {
    const redirectUrl = `https://buy.stripe.com/${id}${clickId ? `?client_reference_id=pimms_id_${clickId}` : ""}`;
    redirect(redirectUrl, RedirectType.replace);
  }

  if (!plan || !period) {
    return new Response("Missing plan or period", { status: 400 });
  }

  const priceId = getPriceIdForCheckout({ plan, period: period as any });
  if (!priceId) {
    return new Response("Invalid plan/period", { status: 400 });
  }

  const apiKey = process.env.STRIPE_SECRET_KEY;
  if (!apiKey) {
    return new Response("STRIPE_SECRET_KEY is not set", { status: 500 });
  }

  const stripe = new Stripe(apiKey, {
    // Use Stripe SDK default API version (kept in sync by the installed Stripe package types).
  });

  const isLifetime = period === "lifetime";

  const session = await stripe.checkout.sessions.create({
    mode: isLifetime ? "payment" : "subscription",
    line_items: [{ price: priceId, quantity: 1 }],
    allow_promotion_codes: true,
    // We keep redirects simple for the marketing site. You can update these to a dedicated
    // success/cancel page if you have them.
    success_url: `${request.nextUrl.origin}/?checkout=success`,
    cancel_url: `${request.nextUrl.origin}${request.nextUrl.pathname.replace(/\/api\/pay$/, "")}`,
    ...(clickId ? { client_reference_id: `pimms_id_${clickId}` } : {}),
  });

  if (!session.url) {
    return new Response("Stripe checkout session URL missing", { status: 500 });
  }

  redirect(session.url, RedirectType.replace);
}
