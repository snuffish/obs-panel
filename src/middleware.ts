import { type NextRequest, NextResponse } from "next/server";
import { menuItems } from "./components/footer";

const Routes = menuItems.map(item => item.path)

export default function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    
    if (pathname === '/' || pathname === '/dashboard') return NextResponse.rewrite(new URL('/dashboard/info', request.url))
        
    if (Routes.includes(pathname)) {
        console.log()
        return NextResponse.rewrite(new URL(`/dashboard${pathname}`, request.url))
    }
    
}

export const config = {
    matcher: '/:path*'
}
