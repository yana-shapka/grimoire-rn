/**
 * AuthContext — контекст для керування станом авторизації.
 *
 * Надає:
 *   isLoggedIn: boolean        — чи залогінений юзер
 *   user: User | null          — дані поточного юзера
 *   login(email, password)     — mock-логін, повертає true/false
 *   logout()                   — скидає стан авторизації
 *
 * Дані зберігаються в пам'яті (useState).
 *
 * Використання:
 *   const { isLoggedIn, user, login, logout } = useAuth();
 */

import React, { createContext, useState, useContext, ReactNode } from 'react';

export interface User {
  email: string;
  username: string; // частина email до @ — наприклад 'yana' з 'yana@mail.com'
}

interface AuthContextValue {
  isLoggedIn: boolean;
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}


const MIN_PASSWORD_LENGTH = 4;


/**
 * getUsernameFromEmail — витягує username з email.
 * 'yana@mail.com' → '@yana'
 */
const getUsernameFromEmail = (email: string): string => {
  const local = email.split('@')[0];
  return `@${local}`;
};

// ─── Контекст ─────────────────────────────────────────────────────────────────

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);



interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  /**
   * login — mock-авторизація без реального API.
   * Перевіряє лише базову валідацію (непорожній email, пароль >= 4 символів).
   * username генерується автоматично з введеного email.
   */
  const login = (email: string, password: string): boolean => {
    if (email.trim().length === 0 || password.length < MIN_PASSWORD_LENGTH) {
      return false;
    }

    setUser({
      email: email.trim(),
      username: getUsernameFromEmail(email.trim()),
    });
    setIsLoggedIn(true);
    return true;
  };

  /**
   * logout — скидає стан авторизації.
   * StackNavigator реагує на isLoggedIn і автоматично показує Login.
   */
  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


/**
 * useAuth — хук для доступу до AuthContext.
 * Кидає помилку якщо використовується поза AuthProvider.
 */
export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
};