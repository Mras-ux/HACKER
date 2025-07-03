import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  username: string;
  email: string;
  role: 'member' | 'admin';
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // 检查本地存储中的用户信息
    const savedUser = localStorage.getItem('hacker_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    // 模拟登录验证
    if ((username === 'admin' && password === 'admin123') || 
        (username === 'member' && password === 'member123')) {
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        username,
        email: `${username}@hacker.com`,
        role: username === 'admin' ? 'admin' : 'member',
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`
      };
      setUser(mockUser);
      localStorage.setItem('hacker_user', JSON.stringify(mockUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('hacker_user');
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin'
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};