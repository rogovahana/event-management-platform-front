// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import { useAuth0 } from '@auth0/auth0-react';

// interface ProtectedRouteProps {
//   children: React.ReactNode;
// }

// const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
//   const { isAuthenticated } = useAuth0();

//   if (!isAuthenticated) {
//     return <Navigate to="/login" />;
//   }

//   return <>{children}</>;
// };

// export default ProtectedRoute;
