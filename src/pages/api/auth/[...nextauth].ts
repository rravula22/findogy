import NextAuth from 'next-auth';
import credentials from 'next-auth/providers/credentials';


export default NextAuth({
  providers: [
    credentials({
      credentials: {
        name: { label: "Name", type: "text" },
        email: { label: "Email", type: "text" },
      },
      async authorize(credentials : any) {
        const { name, email } = credentials;
        if (name && email) {
          return Promise.resolve(credentials);
        }

        // Authentication failed
        return Promise.resolve(null);
      },
    }),
  ],
  session: {
    maxAge: 24 * 60 * 60, // 24 hours
  },
  secret: 'A33D2F3C-4B1C-4F1A-8F6C-5F6E3C2B1A0D'
});
