import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_ROUTES = ['/sign-in', '/sign-up', '/'];
const PRIVATE_ROUTES = ['/profile', '/notes'];

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const isPublic = PUBLIC_ROUTES.some((route) => pathname.startsWith(route));
    const isPrivate = PRIVATE_ROUTES.some((route) => pathname.startsWith(route));

    const hasToken = request.cookies.has('refreshToken');

    if (isPrivate && !hasToken) {
        const url = request.nextUrl.clone();
        url.pathname = '/sign-in';
        return NextResponse.redirect(url);
    }

    if (isPublic && hasToken) {
        const url = request.nextUrl.clone();
        url.pathname = '/profile';
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}
export const config = {
    matcher: ['/profile/:path*', '/notes/:path*', '/sign-in', '/sign-up'],
};
