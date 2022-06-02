import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
    providers: [

        GoogleProvider({
            clientId: process.env.GOOGLE_AUTH_CLIENT_ID,
            clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        })
    ],
    pages: {
        signIn: '/auth/signin',
    },
    callbacks: {
        async redirect({ url, baseUrl }) {
            const redirect = (new URL(url)).searchParams.get("callbackUrl")
            if(redirect) return redirect
            if (url.startsWith(baseUrl)) return url
            // Allows relative callback URLs
            else if (url.startsWith("/")) return new URL(url, baseUrl).toString()
            return baseUrl;
        }
    }
})