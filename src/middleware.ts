import { NextResponse } from "next/server";
import { NextRequest } from "next/server";


export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const publicPaths = ["/login","/signup","/auth/verify","/auth/reset" ];
    
    const isPublicPath = publicPaths.includes(path);
    
    const token = request.cookies.get("token")?.value || "";

    if(isPublicPath && token){
        return NextResponse.redirect(new URL("/",request.nextUrl));
    }

    if(!isPublicPath && !token){
        return NextResponse.redirect(new URL("/login",request.nextUrl));
    }
}

export const config = {
  matcher: ["/", "/profile/:path*", "/login", "/signup", "/auth/:path*"],
};
