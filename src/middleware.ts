import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

interface UserPayload {
    isAdmin: boolean;
    isVerified: boolean;
    [key: string]: any;
}

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const url = req.nextUrl.clone();
    const { searchParams } = new URL(req.url);
    const paiementToken = searchParams.get('token');
    const orderId = searchParams.get('orderId');

    let isAdmin = false;
    let isVerified = false;



    if (token) {
        const userPayload = token as UserPayload;
        isAdmin = userPayload.isAdmin;
        isVerified = userPayload.isVerified;
    }

    if(!token && url.pathname === '/admin'){
        url.pathname = '/';
        const response = NextResponse.redirect(url)
        response.cookies.set('flashMessage', 'Vous avez déjà vérifié votre compte.', { path: '/' })
        return response;
    }

    // Bloquer l'accès à /validation si l'utilisateur est déjà vérifié
    if (token && token.isVerified && url.pathname === '/validation') {
        url.pathname = '/';
        const response = NextResponse.redirect(url);
        response.cookies.set('flashMessage', 'Vous avez déjà vérifié votre compte.', { path: '/' });
        return response;
    }

    // Rediriger les utilisateurs non-vérifiés vers la page de validation
    if (token && !isVerified && url.pathname !== '/validation') {
        url.pathname = '/validation';
        const response = NextResponse.redirect(url);
        response.cookies.set('flashMessage', 'Veuillez vérifier votre compte.', { path: '/' });
        return response;
    }

    // Rediriger les utilisateurs non-admin essayant d'accéder à des pages admin
    if (token && isVerified && !isAdmin && url.pathname.startsWith('/admin')) {
        url.pathname = '/';
        const response = NextResponse.redirect(url);
        response.cookies.set('flashMessage', 'Accès interdit. Administrateurs uniquement.', { path: '/' });
        return response;
    }

    if(!token && url.pathname === '/orders'){
        url.pathname = '/';
        const response = NextResponse.redirect(url);
        response.cookies.set('flashMessage', 'Vous devez être connecté pour avoir accés a vos commande', { path: '/' });
        return response;
    }

    if(!token && url.pathname === '/paiement'){
        url.pathname = '/';
        const response = NextResponse.redirect(url);
        response.cookies.set('flashMessage', 'Vous devez être connecté pour pouvoir acheté', { path: '/' });
        return response;
    }

    if (url.pathname === '/paiement/success' && (!orderId && !paiementToken)) {
        url.pathname = '/';
        const response = NextResponse.redirect(url)
        response.cookies.set('flashMessage', 'cette page n est pas disponnible si aucun paiement n a été effectué' , { path: '/' })
        return response;
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/',
        '/support',
        '/contact',
        '/products',
        '/paiement',
        '/admin/:path*',
        '/validation',
    ],
};
