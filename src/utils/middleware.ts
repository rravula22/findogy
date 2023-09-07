// export default async function sessionCheck() {
//   const userStatus = localStorage.getItem('userStatus'); 
//   // Check if userStatus is valid (you can define your own criteria)
//   if (userStatus === 'active') {
//     next(); // Continue processing the request
//   } else {
//     // UserStatus is not valid, handle accordingly (e.g., deny access or redirect)
//     console.log('UserStatus is not valid. Denying access...');
//     // Perform access denial or redirection logic here
//     res.status(403).json({ error: 'Access denied' });
//   }
// }

// // Other middleware functions can be defined here

// }

