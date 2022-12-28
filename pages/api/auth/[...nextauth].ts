/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

type credentialsProps = {
  user: string;
  pass: string;
};

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        user: {
          label: 'user',
          type: 'text',
        },
        pass: { label: 'Password', type: 'text' }
      },
      async authorize(credentials) {
        const { user, pass } = credentials as credentialsProps;

        const response = await fetch(`http://localhost:3000/api/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user,
            pass,
          }),
        });

        const data = await response.json();

        if (data.error) {
          throw new Error(data.error);
        }

        return data;
        
      },
    }),
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: '/auth',
    error: '/auth',
  },
  callbacks: {
    async jwt({ token, user, account }: any) {
      if (account && user) {
        return {
          ...token,
          accessToken: user.SessionId,
          sessionTimeout: user.SessionTimeout,
          version: user.Version,
        };
      }
      return token;
    },

    async session({ session, token }: any) {
      session.accessToken = token.accessToken;
      session.sessionTimeout = token.sessionTimeout;
      session.version = token.version;

      return session;
    },
    async redirect({ baseUrl }: any) {
      return `${baseUrl}/api/auth/callback`
    },
  },
});