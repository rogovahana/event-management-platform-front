import { createContext, useContext, ReactNode, FC } from 'react';
import { Auth0Provider, AppState } from '@auth0/auth0-react';
import config from '../../auth_config.json';

interface AuthProviderProps {
  children: ReactNode;
}

interface User {
  username?: string;
  email?: string;
}

interface AuthContextProps {
  isAuthenticated: boolean;
  user: User;
  loginWithRedirect: () => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const onRedirectCallback = (appState?: AppState) => {
    window.history.replaceState(
      {},
      document.title,
      appState && appState.returnTo ? appState.returnTo : "http://localhost:5173/"
    );
  };

  return (
    <Auth0Provider
      domain={config.domain}
      clientId={config.clientId}
      authorizationParams={{
        redirect_uri: 'http://localhost:5173',
        audience: config.audience,
        scope: "openid profile"
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export const useAuth = () => {
  const auth = useContext(AuthContext);
  if (auth === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return auth;
};