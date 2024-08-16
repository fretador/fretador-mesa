import React from 'react';
import PrivateRoute from '@/components/PrivateRoute';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const AuthenticatedLayout: React.FC<PrivateRouteProps> = ({ children }) => {
  return (
    <PrivateRoute>
      {children}
    </PrivateRoute>
  );
};

export default AuthenticatedLayout;
