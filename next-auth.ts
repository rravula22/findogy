// import NextAuth from 'next-auth';
// import Providers from 'next-auth/providers';

// export default NextAuth({
//   providers: [
//     Providers.Credentials({
//       // The name to display on the sign-in form (e.g., "Email")
//       name: 'Credentials',
//       credentials: {
//         username: { label: 'Username', type: 'text' },
//         password: { label: 'Password', type: 'password' },
//       },
//       authorize: async (credentials) => {
//         // Add your custom authentication logic here
//         const response = await fetch('https://your-auth-api.com/login', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(credentials),
//         });

//         if (response.ok) {
//           const user = await response.json();
//           return Promise.resolve(user);
//         } else {
//           return Promise.resolve(null);
//         }
//       },
//     }),
//   ],
//   session: {
//     jwt: true,
//   },
//   callbacks: {
//     async session(session, user) {
//       session.user = user;
//       return session;
//     },
//   },
// });
