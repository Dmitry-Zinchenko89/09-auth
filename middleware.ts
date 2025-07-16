import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_ROUTES = ['/sign-in', '/sign-up'];
const PRIVATE_ROUTES = ['/notes', '/profile'];

export async function middleware(request: NextRequest) {
    const url = request.nextUrl.clone();

    const accessToken = request.cookies.get('accessToken')?.value;
    const refreshToken = request.cookies.get('refreshToken')?.value;

    const isPublic = PUBLIC_ROUTES.some((path) => url.pathname.startsWith(path));
    const isPrivate = PRIVATE_ROUTES.some((path) => url.pathname.startsWith(path));

    const isAuthenticated = Boolean(accessToken);


    if (!isAuthenticated && refreshToken) {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/session`, {
                method: 'GET',
                headers: {
                    Cookie: `refreshToken=${refreshToken}`,
                },
            });

            if (response.ok) {
                const newAccessToken = response.headers.getSetCookie().find((cookie) =>
                    cookie.startsWith('accessToken='),
                );

                if (newAccessToken) {
                    const res = NextResponse.next();
                    res.headers.set('set-cookie', newAccessToken);
                    return res;
                }
            }
        } catch (error) {
            console.error('Session refresh failed:', error);
        }
    }


    if (isPrivate && !isAuthenticated) {
        url.pathname = '/sign-in';
        return NextResponse.redirect(url);
    }


    if (isPublic && isAuthenticated) {
        url.pathname = '/profile';
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}


export const config = {
    matcher: ['/sign-in', '/sign-up', '/profile/:path*', '/notes/:path*'],
};