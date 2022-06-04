import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import {PrismaAdapter} from '@next-auth/prisma-adapter';
import prisma from '../../../lib/prisma';

export default NextAuth({
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: 'jwt',

        // Seconds - How long until an idle session expires and is no longer valid.
        maxAge: 30 * 24 * 60 * 60, // 30 days

        // Seconds - Throttle how frequently to write to database to extend a session.
        // Use it to limit write operations. Set to 0 to always update the database.
        // Note: This option is ignored if using JSON Web Tokens
        updateAge: 24 * 60 * 60, // 24 hours
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_AUTH_CLIENT_ID,
            clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: 'consent',
                    access_type: 'offline',
                    response_type: 'code',
                },
            },
        }),
    ],
    pages: {
        signIn: '/auth/signin',
    },
    callbacks: {
        async signIn({user, account, profile, email, credentials}) {
            if (!user.firstName) {
                const [firstName, lastName] = user.name.trim().split(' ');

                const data = {firstName, lastName};
                if (profile.email_verified) data.emailVerified = true;
                await prisma.user.update({
                    where: {
                        email: user.email,
                    },
                    data,
                });
            }
            return true;
        },

        async session({session, user, token}) {
            const userData = await prisma.user.findUnique({
                where: {email: session.user.email},
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    phoneNumber: true,
                },
            });

            return {
                ...session,
                user: {
                    ...session.user,
                    ...userData,
                },
            };
        },
        async redirect({url, baseUrl}) {
            const redirect = new URL(url).searchParams.get('callbackUrl');
            if (redirect) return redirect;
            if (url.startsWith(baseUrl)) return url;
            // Allows relative callback URLs
            else if (url.startsWith('/')) return new URL(url, baseUrl).toString();
            return baseUrl;
        },
    },
});
