import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
const secretKey = "mySecretKey";
import CryptoJS from 'crypto-js';

export function middleware(request: any) {
    const publicRoute = ['/login', '/register']; // declare route public

    if (publicRoute.includes(request.nextUrl.pathname)) {
        // console.log("You have not filtering..");
        return NextResponse.next();
    }

    else {
        // console.log("You have filtering..");

        if(!request.cookies.get('ia') || !request.cookies.get('ia').value){
            return NextResponse.redirect(new URL('/login', request.url));
        }

        const isLogin = request.cookies.get('ia').value === 'true';
        // console.log({ isLogin }, request.cookies.get('ia').value)
        // Cek apakah pengguna sudah login
        if (!isLogin) {
            return NextResponse.redirect(new URL('/login', request.url));
        }

        // Dapatkan peran pengguna dari cookie
        const userRole: string = request.cookies.get('rb').value;
        const decryptRole = CryptoJS.AES.decrypt(userRole.replace(/_/g, '/'), secretKey).toString(CryptoJS.enc.Utf8);
        // Tentukan rute yang hanya bisa diakses oleh admin
        const adminRoutes = ['/admin', '/admin/settings'];
        const userRoutes = ['/dashboard', '/profile'];

        // Periksa apakah rute yang diminta adalah rute admin
        if (adminRoutes.includes(request.nextUrl.pathname)) {
            // lakukan logika untuk role admin
            if (decryptRole !== 'admin') {
                return NextResponse.redirect(new URL('/not-authorized', request.url));
            }
        }

        if (adminRoutes.includes(request.nextUrl.pathname)) {
            // lakukan logika untuk role admin
            if (decryptRole !== 'doctor') {
                return NextResponse.redirect(new URL('/not-authorized', request.url));
            }
        }

        // Periksa apakah rute yang diminta adalah rute user biasa
        if (userRoutes.includes(request.nextUrl.pathname)) {
            // lakukan logika untuk role user
            if (decryptRole !== 'user') {
                return NextResponse.redirect(new URL('/not-authorized', request.url));
            }
        }
    }

    // Jika semua pengecekan lolos, izinkan akses ke rute yang diminta
    return NextResponse.next();
}

export const config = {
    matcher: [
        // '/:path*',   // Cek semua
        // '/admin/:path*',   // Cek akses admin
        '/dashboard/:path*', // Cek akses user
        // '/profile/:path*',
        // '/dashboard'
    ],
};
