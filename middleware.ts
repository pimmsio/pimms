import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

function handleBootstrapLocaleRedirect(
  request: NextRequest
): NextResponse | undefined {
  const pathname = request.nextUrl.pathname;

  if (pathname === "/") {
    const hasCookie = request.cookies.has("NEXT_LOCALE");
    if (!hasCookie) {
      const acceptLang = request.headers.get("accept-language") || "";
      if (acceptLang.toLowerCase().startsWith("fr")) {
        const url = request.nextUrl.clone();
        url.pathname = "/fr";
        return NextResponse.redirect(url);
      }
    }
  }

  return undefined;
}

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const maybeRedirect = handleBootstrapLocaleRedirect(request);
  if (maybeRedirect) return maybeRedirect;

  return intlMiddleware(request); // ← laisse next-intl faire le reste
}

export const config = {
  // Matcher entries are linked with a logical "or", therefore
  // if one of them matches, the middleware will be invoked.
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};
