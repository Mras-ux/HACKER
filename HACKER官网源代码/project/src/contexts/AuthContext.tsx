import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  username: string;
  email: string;
  role: 'member' | 'admin' | 'vice_admin' | 'super_admin';
  avatar?: string;
  status: 'pending' | 'active' | 'rejected';
  appliedAt?: string;
  activatedAt?: string;
  activatedBy?: string;
}

interface PendingUser {
  id: string;
  username: string;
  email: string;
  appliedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  bio?: string;
  reason?: string;
}

interface Solution {
  id: string;
  title: string;
  author: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  tags: string[];
  description: string;
  solution: string;
  code: string;
  complexity: string;
  problemUrl?: string;
  createdAt: string;
  views: number;
  likes: number;
  status: 'published' | 'draft' | 'hidden';
}

interface Discussion {
  id: string;
  title: string;
  author: string;
  category: string;
  tags: string[];
  content: string;
  createdAt: string;
  replies: number;
  views: number;
  likes: number;
  status: 'published' | 'hidden' | 'locked';
  isPinned: boolean;
}

interface Resource {
  id: string;
  title: string;
  author: string;
  category: string;
  type: string;
  description: string;
  url: string;
  tags: string[];
  size?: string;
  downloads: number;
  createdAt: string;
  status: 'published' | 'hidden';
}

interface SystemSettings {
  siteName: string;
  siteDescription: string;
  allowRegistration: boolean;
  requireApproval: boolean;
  maxFileSize: number;
  allowedFileTypes: string[];
  emailNotifications: boolean;
  maintenanceMode: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (userData: any) => Promise<boolean>;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  isViceAdmin: boolean;
  canManageUsers: boolean;
  pendingUsers: PendingUser[];
  solutions: Solution[];
  discussions: Discussion[];
  resources: Resource[];
  systemSettings: SystemSettings;
  approveUser: (userId: string) => void;
  rejectUser: (userId: string, reason?: string) => void;
  promoteUser: (userId: string, newRole: User['role']) => void;
  getRoleDisplayName: (role: User['role']) => string;
  getRoleLevel: (role: User['role']) => number;
  // Solutions management
  addSolution: (solution: Omit<Solution, 'id' | 'createdAt' | 'views' | 'likes'>) => void;
  updateSolution: (id: string, updates: Partial<Solution>) => void;
  deleteSolution: (id: string) => void;
  // Discussions management
  addDiscussion: (discussion: Omit<Discussion, 'id' | 'createdAt' | 'replies' | 'views' | 'likes'>) => void;
  updateDiscussion: (id: string, updates: Partial<Discussion>) => void;
  deleteDiscussion: (id: string) => void;
  // Resources management
  addResource: (resource: Omit<Resource, 'id' | 'createdAt' | 'downloads'>) => void;
  updateResource: (id: string, updates: Partial<Resource>) => void;
  deleteResource: (id: string) => void;
  // System settings
  updateSystemSettings: (settings: Partial<SystemSettings>) => void;
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
  const [pendingUsers, setPendingUsers] = useState<PendingUser[]>([]);
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [systemSettings, setSystemSettings] = useState<SystemSettings>({
    siteName: 'HACKER交流会官方网站',
    siteDescription: '专注于算法竞赛与编程学习的优秀团队',
    allowRegistration: true,
    requireApproval: true,
    maxFileSize: 10,
    allowedFileTypes: ['pdf', 'doc', 'docx', 'zip', 'rar', 'txt', 'md'],
    emailNotifications: true,
    maintenanceMode: false
  });

  useEffect(() => {
    // 检查本地存储中的数据
    const savedUser = localStorage.getItem('hacker_user');
    const savedPendingUsers = localStorage.getItem('hacker_pending_users');
    const savedSolutions = localStorage.getItem('hacker_solutions');
    const savedDiscussions = localStorage.getItem('hacker_discussions');
    const savedResources = localStorage.getItem('hacker_resources');
    const savedSettings = localStorage.getItem('hacker_settings');
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    
    if (savedPendingUsers) {
      setPendingUsers(JSON.parse(savedPendingUsers));
    }

    if (savedSolutions) {
      setSolutions(JSON.parse(savedSolutions));
    }

    if (savedDiscussions) {
      setDiscussions(JSON.parse(savedDiscussions));
    }

    if (savedResources) {
      setResources(JSON.parse(savedResources));
    }

    if (savedSettings) {
      setSystemSettings(JSON.parse(savedSettings));
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    // 预设管理员账户
    const adminAccounts = {
      'superadmin': { role: 'super_admin' as const, password: 'super123' },
      'viceadmin': { role: 'vice_admin' as const, password: 'vice123' },
      'admin': { role: 'admin' as const, password: 'admin123' }
    };

    if (adminAccounts[username as keyof typeof adminAccounts] && 
        adminAccounts[username as keyof typeof adminAccounts].password === password) {
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        username,
        email: `${username}@hacker.com`,
        role: adminAccounts[username as keyof typeof adminAccounts].role,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
        status: 'active',
        activatedAt: new Date().toISOString()
      };
      setUser(mockUser);
      localStorage.setItem('hacker_user', JSON.stringify(mockUser));
      return true;
    }
    
    return false;
  };

  const register = async (userData: any): Promise<boolean> => {
    try {
      const newPendingUser: PendingUser = {
        id: Math.random().toString(36).substr(2, 9),
        username: userData.username,
        email: userData.email,
        appliedAt: new Date().toISOString(),
        status: 'pending',
        bio: userData.bio || ''
      };
      
      const updatedPendingUsers = [...pendingUsers, newPendingUser];
      setPendingUsers(updatedPendingUsers);
      localStorage.setItem('hacker_pending_users', JSON.stringify(updatedPendingUsers));
      return true;
    } catch (error) {
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('hacker_user');
  };

  const approveUser = (userId: string) => {
    const updatedUsers = pendingUsers.map(user => 
      user.id === userId 
        ? { ...user, status: 'approved' as const }
        : user
    );
    setPendingUsers(updatedUsers);
    localStorage.setItem('hacker_pending_users', JSON.stringify(updatedUsers));
  };

  const rejectUser = (userId: string, reason?: string) => {
    const updatedUsers = pendingUsers.map(user => 
      user.id === userId 
        ? { ...user, status: 'rejected' as const, reason }
        : user
    );
    setPendingUsers(updatedUsers);
    localStorage.setItem('hacker_pending_users', JSON.stringify(updatedUsers));
  };

  const promoteUser = (userId: string, newRole: User['role']) => {
    // 这里可以实现用户角色提升逻辑
    console.log(`Promoting user ${userId} to ${newRole}`);
  };

  const getRoleDisplayName = (role: User['role']): string => {
    const roleNames = {
      'super_admin': '站长',
      'vice_admin': '副站长', 
      'admin': '管理员',
      'member': '普通成员'
    };
    return roleNames[role];
  };

  const getRoleLevel = (role: User['role']): number => {
    const roleLevels = {
      'super_admin': 4,
      'vice_admin': 3,
      'admin': 2,
      'member': 1
    };
    return roleLevels[role];
  };

  // Solutions management
  const addSolution = (solution: Omit<Solution, 'id' | 'createdAt' | 'views' | 'likes'>) => {
    const newSolution: Solution = {
      ...solution,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      views: 0,
      likes: 0
    };
    const updatedSolutions = [...solutions, newSolution];
    setSolutions(updatedSolutions);
    localStorage.setItem('hacker_solutions', JSON.stringify(updatedSolutions));
  };

  const updateSolution = (id: string, updates: Partial<Solution>) => {
    const updatedSolutions = solutions.map(solution =>
      solution.id === id ? { ...solution, ...updates } : solution
    );
    setSolutions(updatedSolutions);
    localStorage.setItem('hacker_solutions', JSON.stringify(updatedSolutions));
  };

  const deleteSolution = (id: string) => {
    const updatedSolutions = solutions.filter(solution => solution.id !== id);
    setSolutions(updatedSolutions);
    localStorage.setItem('hacker_solutions', JSON.stringify(updatedSolutions));
  };

  // Discussions management
  const addDiscussion = (discussion: Omit<Discussion, 'id' | 'createdAt' | 'replies' | 'views' | 'likes'>) => {
    const newDiscussion: Discussion = {
      ...discussion,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      replies: 0,
      views: 0,
      likes: 0
    };
    const updatedDiscussions = [...discussions, newDiscussion];
    setDiscussions(updatedDiscussions);
    localStorage.setItem('hacker_discussions', JSON.stringify(updatedDiscussions));
  };

  const updateDiscussion = (id: string, updates: Partial<Discussion>) => {
    const updatedDiscussions = discussions.map(discussion =>
      discussion.id === id ? { ...discussion, ...updates } : discussion
    );
    setDiscussions(updatedDiscussions);
    localStorage.setItem('hacker_discussions', JSON.stringify(updatedDiscussions));
  };

  const deleteDiscussion = (id: string) => {
    const updatedDiscussions = discussions.filter(discussion => discussion.id !== id);
    setDiscussions(updatedDiscussions);
    localStorage.setItem('hacker_discussions', JSON.stringify(updatedDiscussions));
  };

  // Resources management
  const addResource = (resource: Omit<Resource, 'id' | 'createdAt' | 'downloads'>) => {
    const newResource: Resource = {
      ...resource,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      downloads: 0
    };
    const updatedResources = [...resources, newResource];
    setResources(updatedResources);
    localStorage.setItem('hacker_resources', JSON.stringify(updatedResources));
  };

  const updateResource = (id: string, updates: Partial<Resource>) => {
    const updatedResources = resources.map(resource =>
      resource.id === id ? { ...resource, ...updates } : resource
    );
    setResources(updatedResources);
    localStorage.setItem('hacker_resources', JSON.stringify(updatedResources));
  };

  const deleteResource = (id: string) => {
    const updatedResources = resources.filter(resource => resource.id !== id);
    setResources(updatedResources);
    localStorage.setItem('hacker_resources', JSON.stringify(updatedResources));
  };

  // System settings
  const updateSystemSettings = (settings: Partial<SystemSettings>) => {
    const updatedSettings = { ...systemSettings, ...settings };
    setSystemSettings(updatedSettings);
    localStorage.setItem('hacker_settings', JSON.stringify(updatedSettings));
  };

  const value = {
    user,
    login,
    logout,
    register,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin' || user?.role === 'vice_admin' || user?.role === 'super_admin',
    isSuperAdmin: user?.role === 'super_admin',
    isViceAdmin: user?.role === 'vice_admin',
    canManageUsers: user?.role === 'admin' || user?.role === 'vice_admin' || user?.role === 'super_admin',
    pendingUsers,
    solutions,
    discussions,
    resources,
    systemSettings,
    approveUser,
    rejectUser,
    promoteUser,
    getRoleDisplayName,
    getRoleLevel,
    addSolution,
    updateSolution,
    deleteSolution,
    addDiscussion,
    updateDiscussion,
    deleteDiscussion,
    addResource,
    updateResource,
    deleteResource,
    updateSystemSettings
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};