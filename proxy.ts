// proxy.ts
import NextAuth from "next-auth";
import { authConfig } from "./auth.config"; // 👈 Gunakan config yang bebas Prisma

// Inisialisasi auth khusus untuk proxy/middleware
const { auth } = NextAuth(authConfig);

// Kita ekspor 'auth' sebagai 'proxy' dengan logika kustom di dalamnya
export const proxy = auth((req) => {
  const isLoggedIn = !!req.auth;
  const { pathname } = req.nextUrl;

  const isProtectedPath = 
    (pathname.startsWith('/admin') || pathname.startsWith('/dashboard')) && 
    !pathname.startsWith('/admin/login');

  const isAuthPath = 
    pathname === '/admin/login' || 
    pathname === '/login' || 
    pathname === '/register';

  // Logika 1: Belum login tapi mencoba masuk /admin -> Tendang ke /login
  if (isProtectedPath && !isLoggedIn) {
    return Response.redirect(new URL("/admin/login", req.nextUrl.origin));
  }

  // Logika 2: Sudah login tapi mencoba masuk halaman /login -> Arahkan ke /admin
  if (isAuthPath && isLoggedIn) {
    return Response.redirect(new URL("/admin", req.nextUrl.origin));
  }

  // Lolos pengecekan, silakan masuk
  return;
});

// Config matcher
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};