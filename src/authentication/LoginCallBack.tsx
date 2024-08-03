// import { useEffect, useState } from 'react';
// import authService from './AuthService';

// const LoginCallback = () => {
//   const [isLoading, setIsLoading] = useState(true);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     authService.handleAuthentication(() => {
//       setIsLoading(false);
//       setIsAuthenticated(true);
//       console.log('Login successful!');
//       setTimeout(() => {
//         window.location.href = '/'; // Redirect to home page after a short delay
//       }, 2000); // 2-second delay before redirect  to test 
//     });
//   }, []);

//   useEffect(() => {
//     if (!isLoading && !isAuthenticated) {
//       console.log('Authentication failed. Please try again.');
//     }
//   }, [isLoading, isAuthenticated]);

//   return (
//     <div>
//       {isLoading && <div>Loading...</div>}
//       {!isLoading && isAuthenticated && (
//         <div>
//           <p>Login successful! Redirecting...</p>
//           <p>You will be redirected to the home page shortly.</p>
//         </div>
//       )}
//       {!isLoading && !isAuthenticated && (
//         <div>
//           <p>Authentication failed. Please try again.</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default LoginCallback;
