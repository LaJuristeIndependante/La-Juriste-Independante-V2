// AuthContext.tsx
import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import Cookies from 'js-cookie';
import { EventEmitter } from 'events';

// Typage pour les valeurs du contexte
interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

// Création du contexte
export const AuthContext = createContext<AuthContextType | undefined>(undefined);
const authEventEmitter = new EventEmitter();

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(typeof window !== 'undefined' && Cookies.get('isAuthenticated') === 'true');

  const login = useCallback(() => {
    setIsAuthenticated(true);
    Cookies.set('isAuthenticated', 'true', { secure: true, sameSite: 'strict' });
    authEventEmitter.emit('authChange');
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    Cookies.remove('isAuthenticated');
    authEventEmitter.emit('authChange');
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { authEventEmitter };
