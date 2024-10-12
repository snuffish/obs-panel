import { type NextRequest, NextResponse } from "next/server";

const Routes = ['/dashboard', '/info', '/scenes', '/record', '/stream', '/new']

export default function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    
    if (pathname === '/' || pathname === '/dashboard') return NextResponse.rewrite(new URL('/dashboard/info', request.url))
        
    if (Routes.includes(pathname)) return NextResponse.rewrite(new URL(`/dashboard${pathname}`, request.url))
    
}

export const config = {
    matcher: '/:path*'
}
