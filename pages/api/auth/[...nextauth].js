import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import {PrismaAdapter} from '@next-auth/prisma-adapter';
import prisma from '../../../lib/prisma';
import CredentialsProvider from 'next-auth/providers/credentials';

const createAnonymousUser = async () => {
    return await prisma.user.upsert({
        create: {
            id: '1',
            cart: {
                create: {},
            },
        },
        update: {},
        where: {
            id: '1',
        },
    });
};

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
        // isLoggedIn: token.sub !== undefined,
    },
    providers: [
        CredentialsProvider({
            id: 'anon',
            name: 'Anonymous',
            credentials: {},
            async authorize() {
                // createAnonymousUser is a function returning the id of the new persistent session
                const {id} = await createAnonymousUser();
                return {
                    id,
                };
            },
        }),
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
            if (account.provider === 'anon') {
                return true;
            }
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
            if (!session.user.email) {
                // anon user
                const userData = await prisma.user.findUnique({
                    where: {id: token.sub},
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        phoneNumber: true,
                    },
                });
                return {
                    ...session,
                    isLoggedIn: token.sub !== undefined,
                    user: {
                        ...session.user,
                        ...userData,
                    },
                };
            }
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
