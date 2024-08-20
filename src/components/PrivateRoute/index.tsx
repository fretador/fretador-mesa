import React from 'react';
import { useRouter } from 'next/router';
import { useAuthController } from '@/controllers/authController';
interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { checkAuthStatus } = useAuthController();
  const router = useRouter();

  React.useEffect(() => {
    if (!checkAuthStatus) {
      router.push('/login');
    }
  }, [checkAuthStatus, router]);

  if (!checkAuthStatus) {
    return null; // Ou um loader, enquanto verifica a autenticação
  }

  return <>{children}</>;
};

export default PrivateRoute;
