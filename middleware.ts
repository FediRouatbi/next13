import { NextRequest, NextResponse } from "next/server";
const locales = ["en", "fr"];

export function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const pathname = request.nextUrl.pathname;
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );
  if (pathname.includes("studio") || pathname.includes("admin")) return;

  if (pathnameIsMissingLocale) {
    // Redirect if there is no locale
    const locale = "fr";

    return NextResponse.redirect(
      new URL(`/${locale}/${pathname}`, request.url)
    );
  }
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next|api).*)",
    // Optional: only run on root (/) URL
    // '/'
  ],
};
