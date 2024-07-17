import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  user: any;
  signIn: (user: any) => void;
  signOut: () => void;
  isSignedUp: boolean;
  setSignedUp: (signedUp: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [isSignedUp, setIsSignedUp] = useState<boolean>(false);

  const signIn = (user: any) => {
    setUser(user);
  };

  const signOut = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, isSignedUp, setSignedUp: setIsSignedUp }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
