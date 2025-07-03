import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Users, FileText, MessageSquare, Download, Settings, BarChart3, Plus, Edit, Trash2, UserPlus, Upload, CalendarPlus, UserCheck, UserX, Crown, Shield, Star, Clock, CheckCircle, XCircle, Eye, Search, Filter, ToggleLeft, ToggleRight, Save, AlertTriangle, Lock, Unlock, Pin, PinOff } from 'lucide-react';
import Modal from '../components/Modal';
import MemberForm from '../components/forms/MemberForm';
import SolutionForm from '../components/forms/SolutionForm';
import ResourceForm from '../components/forms/ResourceForm';
import DiscussionForm from '../components/forms/DiscussionForm';
import ContestForm from '../components/forms/ContestForm';

const Admin: React.FC = () => {
  const { 
    user, isAdmin, isSuperAdmin, isViceAdmin, canManageUsers, 
    pendingUsers, solutions, discussions, resources, systemSettings,
    approveUser, rejectUser, getRoleDisplayName, getRoleLevel,
    addSolution, updateSolution, deleteSolution,
    addDiscussion, updateDiscussion, deleteDiscussion,
    addResource, updateResource, deleteResource,
    updateSystemSettings
  } = useAuth();
  
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'member' | 'solution' | 'resource' | 'discussion' | 'contest' | 'promote'>('member');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isUserDetailModalOpen, setIsUserDetailModalOpen] = useState(false);
  const [isPromoteModalOpen, setIsPromoteModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [tempSettings, setTempSettings] = useState(systemSettings);

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">访问被拒绝</h1>
          <p className="text-gray-600">您没有访问管理后台的权限。</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'dashboard', name: '控制台', icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'users', name: '用户管理', icon: <Users className="w-5 h-5" /> },
    { id: 'activation', name: '用户激活', icon: <UserCheck className="w-5 h-5" /> },
    { id: 'solutions', name: '题解管理', icon: <FileText className="w-5 h-5" /> },
    { id: 'discussions', name: '讨论管理', icon: <MessageSquare className="w-5 h-5" /> },
    { id: 'resources', name: '资源管理', icon: <Download className="w-5 h-5" /> },
    { id: 'settings', name: '系统设置', icon: <Settings className="w-5 h-5" /> }
  ];

  const stats = [
    { name: '总用户数', value: '1', change: '新站点', color: 'text-blue-600' },
    { name: '待激活用户', value: pendingUsers.filter(u => u.status === 'pending').length.toString(), change: '等待处理', color: 'text-orange-600' },
    { name: '题解数量', value: solutions.length.toString(), change: '已发布', color: 'text-green-600' },
    { name: '讨论主题', value: discussions.length.toString(), change: '活跃中', color: 'text-purple-600' }
  ];

  const openModal = (type: typeof modalType) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const handleSubmit = (data: any) => {
    try {
      switch (modalType) {
        case 'solution':
          addSolution({
            ...data,
            author: user?.username || 'Admin',
            status: 'published',
            tags: data.tags ? data.tags.split(',').map((tag: string) => tag.trim()) : []
          });
          break;
        case 'discussion':
          addDiscussion({
            ...data,
            author: user?.username || 'Admin',
            status: 'published',
            isPinned: false,
            tags: data.tags ? data.tags.split(',').map((tag: string) => tag.trim()) : []
          });
          break;
        case 'resource':
          addResource({
            ...data,
            author: user?.username || 'Admin',
            status: 'published',
            tags: data.tags ? data.tags.split(',').map((tag: string) => tag.trim()) : []
          });
          break;
        default:
          console.log(`${modalType} 数据:`, data);
      }
      alert(`${modalType === 'member' ? '成员信息' : modalType === 'solution' ? '题解' : modalType === 'resource' ? '资源' : modalType === 'discussion' ? '讨论' : '比赛信息'}已添加！`);
      setIsModalOpen(false);
    } catch (error) {
      alert('操作失败，请重试');
    }
  };

  const handleApproveUser = (userId: string) => {
    approveUser(userId);
    alert('用户已激活！');
  };

  const handleRejectUser = (userId: string) => {
    const reason = prompt('请输入拒绝原因（可选）：');
    rejectUser(userId, reason || undefined);
    alert('用户申请已拒绝！');
  };

  const openUserDetail = (user: any) => {
    setSelectedUser(user);
    setIsUserDetailModalOpen(true);
  };

  const openPromoteModal = (user: any) => {
    setSelectedUser(user);
    setIsPromoteModalOpen(true);
  };

  const handlePromoteUser = (newRole: string) => {
    // 实现用户提升逻辑
    alert(`用户 ${selectedUser?.username} 已提升为 ${getRoleDisplayName(newRole as any)}`);
    setIsPromoteModalOpen(false);
  };

  const handleDeleteItem = (type: string, id: string) => {
    if (confirm('确定要删除这个项目吗？')) {
      switch (type) {
        case 'solution':
          deleteSolution(id);
          break;
        case 'discussion':
          deleteDiscussion(id);
          break;
        case 'resource':
          deleteResource(id);
          break;
      }
      alert('删除成功！');
    }
  };

  const handleToggleStatus = (type: string, id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'published' ? 'hidden' : 'published';
    switch (type) {
      case 'solution':
        updateSolution(id, { status: newStatus as any });
        break;
      case 'discussion':
        updateDiscussion(id, { status: newStatus as any });
        break;
      case 'resource':
        updateResource(id, { status: newStatus as any });
        break;
    }
  };

  const handleTogglePin = (id: string, isPinned: boolean) => {
    updateDiscussion(id, { isPinned: !isPinned });
  };

  const handleSaveSettings = () => {
    updateSystemSettings(tempSettings);
    alert('系统设置已保存！');
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'super_admin':
        return <Crown className="w-5 h-5 text-yellow-500" />;
      case 'vice_admin':
        return <Shield className="w-5 h-5 text-purple-500" />;
      case 'admin':
        return <Star className="w-5 h-5 text-blue-500" />;
      default:
        return <Users className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full flex items-center space-x-1">
          <Clock className="w-3 h-3" />
          <span>待审核</span>
        </span>;
      case 'approved':
        return <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full flex items-center space-x-1">
          <CheckCircle className="w-3 h-3" />
          <span>已通过</span>
        </span>;
      case 'rejected':
        return <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full flex items-center space-x-1">
          <XCircle className="w-3 h-3" />
          <span>已拒绝</span>
        </span>;
      case 'published':
        return <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">已发布</span>;
      case 'hidden':
        return <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">已隐藏</span>;
      case 'locked':
        return <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">已锁定</span>;
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('zh-CN');
  };

  const renderModalContent = () => {
    const props = {
      onSubmit: handleSubmit,
      onCancel: () => setIsModalOpen(false)
    };

    switch (modalType) {
      case 'member':
        return <MemberForm {...props} />;
      case 'solution':
        return <SolutionForm {...props} />;
      case 'resource':
        return <ResourceForm {...props} />;
      case 'discussion':
        return <DiscussionForm {...props} />;
      case 'contest':
        return <ContestForm {...props} />;
      default:
        return null;
    }
  };

  const getModalTitle = () => {
    switch (modalType) {
      case 'member': return '添加成员信息';
      case 'solution': return '添加题解';
      case 'resource': return '添加资源';
      case 'discussion': return '发起讨论';
      case 'contest': return '添加比赛信息';
      default: return '';
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                    <div className={`text-sm font-medium ${stat.color}`}>
                      {stat.change}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Role Info */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                {getRoleIcon(user?.role || '')}
                <span>当前权限：{getRoleDisplayName(user?.role || 'member')}</span>
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">权限等级说明</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <Crown className="w-4 h-4 text-yellow-500" />
                      <span className="font-medium">站长</span>
                      <span className="text-gray-600">- 最高权限，可管理所有功能</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Shield className="w-4 h-4 text-purple-500" />
                      <span className="font-medium">副站长</span>
                      <span className="text-gray-600">- 协助站长管理，权限仅次于站长</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-blue-500" />
                      <span className="font-medium">管理员</span>
                      <span className="text-gray-600">- 日常管理权限，处理用户事务</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">职位配额</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div>• 站长：1人（当前：1人）</div>
                    <div>• 副站长：1人（当前：0人）</div>
                    <div>• 管理员：10人（当前：0人）</div>
                    <div>• 普通成员：无限制</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">快速操作</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <button 
                  onClick={() => setActiveTab('activation')}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-left"
                >
                  <UserCheck className="w-6 h-6 text-green-600 mb-2" />
                  <h4 className="font-medium text-gray-900">用户激活</h4>
                  <p className="text-sm text-gray-600">处理待激活的用户申请</p>
                  {pendingUsers.filter(u => u.status === 'pending').length > 0 && (
                    <span className="inline-block mt-2 px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">
                      {pendingUsers.filter(u => u.status === 'pending').length} 个待处理
                    </span>
                  )}
                </button>
                <button 
                  onClick={() => openModal('solution')}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-left"
                >
                  <FileText className="w-6 h-6 text-green-600 mb-2" />
                  <h4 className="font-medium text-gray-900">发布题解</h4>
                  <p className="text-sm text-gray-600">添加新的算法题解</p>
                </button>
                <button 
                  onClick={() => openModal('resource')}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-left"
                >
                  <Upload className="w-6 h-6 text-purple-600 mb-2" />
                  <h4 className="font-medium text-gray-900">上传资源</h4>
                  <p className="text-sm text-gray-600">添加学习资料</p>
                </button>
                <button 
                  onClick={() => openModal('discussion')}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-left"
                >
                  <MessageSquare className="w-6 h-6 text-orange-600 mb-2" />
                  <h4 className="font-medium text-gray-900">发起讨论</h4>
                  <p className="text-sm text-gray-600">创建新的讨论话题</p>
                </button>
                <button 
                  onClick={() => openModal('contest')}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-left"
                >
                  <CalendarPlus className="w-6 h-6 text-red-600 mb-2" />
                  <h4 className="font-medium text-gray-900">添加比赛</h4>
                  <p className="text-sm text-gray-600">发布比赛信息</p>
                </button>
                <button 
                  onClick={() => setActiveTab('settings')}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-left"
                >
                  <Settings className="w-6 h-6 text-gray-600 mb-2" />
                  <h4 className="font-medium text-gray-900">系统设置</h4>
                  <p className="text-sm text-gray-600">配置系统参数</p>
                </button>
              </div>
            </div>
          </div>
        );

      case 'activation':
        return (
          <div className="bg-white rounded-xl shadow-lg">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">用户激活管理</h3>
                  <p className="text-sm text-gray-600 mt-1">审核和管理用户注册申请</p>
                </div>
                <div className="text-sm text-gray-500">
                  共 {pendingUsers.length} 个申请
                </div>
              </div>
            </div>
            <div className="p-6">
              {pendingUsers.length === 0 ? (
                <div className="text-center py-12">
                  <UserCheck className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">暂无用户申请</h3>
                  <p className="text-gray-600">当有新用户注册申请时，会在这里显示。</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingUsers.map((pendingUser) => (
                    <div key={pendingUser.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                              <span className="text-white font-medium text-sm">
                                {pendingUser.username.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">{pendingUser.username}</h4>
                              <p className="text-sm text-gray-600">{pendingUser.email}</p>
                            </div>
                            {getStatusBadge(pendingUser.status)}
                          </div>
                          <div className="text-sm text-gray-600 mb-3">
                            <p><strong>申请时间：</strong>{formatDate(pendingUser.appliedAt)}</p>
                            {pendingUser.bio && (
                              <p className="mt-1"><strong>个人简介：</strong>{pendingUser.bio}</p>
                            )}
                            {pendingUser.reason && (
                              <p className="mt-1 text-red-600"><strong>拒绝原因：</strong>{pendingUser.reason}</p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          <button
                            onClick={() => openUserDetail(pendingUser)}
                            className="px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50 transition-colors duration-200 flex items-center space-x-1"
                          >
                            <Eye className="w-4 h-4" />
                            <span>详情</span>
                          </button>
                          {pendingUser.status === 'pending' && (
                            <>
                              <button
                                onClick={() => handleApproveUser(pendingUser.id)}
                                className="px-3 py-1 text-sm text-white bg-green-600 rounded hover:bg-green-700 transition-colors duration-200 flex items-center space-x-1"
                              >
                                <CheckCircle className="w-4 h-4" />
                                <span>通过</span>
                              </button>
                              <button
                                onClick={() => handleRejectUser(pendingUser.id)}
                                className="px-3 py-1 text-sm text-white bg-red-600 rounded hover:bg-red-700 transition-colors duration-200 flex items-center space-x-1"
                              >
                                <XCircle className="w-4 h-4" />
                                <span>拒绝</span>
                              </button>
                            </>
                          )}
                          {pendingUser.status === 'approved' && isSuperAdmin && (
                            <button
                              onClick={() => openPromoteModal(pendingUser)}
                              className="px-3 py-1 text-sm text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-1"
                            >
                              <Crown className="w-4 h-4" />
                              <span>授权</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );

      case 'solutions':
        return (
          <div className="bg-white rounded-xl shadow-lg">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">题解管理</h3>
                <button 
                  onClick={() => openModal('solution')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>添加题解</span>
                </button>
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="搜索题解..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">全部状态</option>
                  <option value="published">已发布</option>
                  <option value="hidden">已隐藏</option>
                </select>
              </div>
            </div>
            <div className="p-6">
              {solutions.length === 0 ? (
                <div className="text-center py-12">
                  <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">暂无题解</h3>
                  <p className="text-gray-600">点击上方按钮添加第一个题解。</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {solutions
                    .filter(solution => 
                      (filterStatus === 'all' || solution.status === filterStatus) &&
                      (searchTerm === '' || solution.title.toLowerCase().includes(searchTerm.toLowerCase()))
                    )
                    .map((solution) => (
                    <div key={solution.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="font-medium text-gray-900">{solution.title}</h4>
                            {getStatusBadge(solution.status)}
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              solution.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                              solution.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {solution.difficulty === 'easy' ? '简单' : solution.difficulty === 'medium' ? '中等' : '困难'}
                            </span>
                          </div>
                          <div className="text-sm text-gray-600 mb-2">
                            <p><strong>作者：</strong>{solution.author} | <strong>分类：</strong>{solution.category} | <strong>发布时间：</strong>{formatDate(solution.createdAt)}</p>
                            <p><strong>浏览：</strong>{solution.views} | <strong>点赞：</strong>{solution.likes}</p>
                          </div>
                          {solution.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mb-2">
                              {solution.tags.map((tag, index) => (
                                <span key={index} className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          <button
                            onClick={() => handleToggleStatus('solution', solution.id, solution.status)}
                            className={`px-3 py-1 text-sm rounded transition-colors duration-200 flex items-center space-x-1 ${
                              solution.status === 'published' 
                                ? 'text-gray-600 border border-gray-300 hover:bg-gray-50' 
                                : 'text-white bg-green-600 hover:bg-green-700'
                            }`}
                          >
                            {solution.status === 'published' ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                            <span>{solution.status === 'published' ? '隐藏' : '发布'}</span>
                          </button>
                          <button
                            onClick={() => handleDeleteItem('solution', solution.id)}
                            className="px-3 py-1 text-sm text-white bg-red-600 rounded hover:bg-red-700 transition-colors duration-200 flex items-center space-x-1"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span>删除</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );

      case 'discussions':
        return (
          <div className="bg-white rounded-xl shadow-lg">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">讨论管理</h3>
                <button 
                  onClick={() => openModal('discussion')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>发起讨论</span>
                </button>
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="搜索讨论..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">全部状态</option>
                  <option value="published">已发布</option>
                  <option value="hidden">已隐藏</option>
                  <option value="locked">已锁定</option>
                </select>
              </div>
            </div>
            <div className="p-6">
              {discussions.length === 0 ? (
                <div className="text-center py-12">
                  <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">暂无讨论</h3>
                  <p className="text-gray-600">点击上方按钮发起第一个讨论。</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {discussions
                    .filter(discussion => 
                      (filterStatus === 'all' || discussion.status === filterStatus) &&
                      (searchTerm === '' || discussion.title.toLowerCase().includes(searchTerm.toLowerCase()))
                    )
                    .map((discussion) => (
                    <div key={discussion.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            {discussion.isPinned && <Pin className="w-4 h-4 text-red-500" />}
                            <h4 className="font-medium text-gray-900">{discussion.title}</h4>
                            {getStatusBadge(discussion.status)}
                          </div>
                          <div className="text-sm text-gray-600 mb-2">
                            <p><strong>作者：</strong>{discussion.author} | <strong>分类：</strong>{discussion.category} | <strong>发布时间：</strong>{formatDate(discussion.createdAt)}</p>
                            <p><strong>回复：</strong>{discussion.replies} | <strong>浏览：</strong>{discussion.views} | <strong>点赞：</strong>{discussion.likes}</p>
                          </div>
                          {discussion.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mb-2">
                              {discussion.tags.map((tag, index) => (
                                <span key={index} className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          <button
                            onClick={() => handleTogglePin(discussion.id, discussion.isPinned)}
                            className={`px-3 py-1 text-sm rounded transition-colors duration-200 flex items-center space-x-1 ${
                              discussion.isPinned 
                                ? 'text-white bg-red-600 hover:bg-red-700' 
                                : 'text-gray-600 border border-gray-300 hover:bg-gray-50'
                            }`}
                          >
                            {discussion.isPinned ? <PinOff className="w-4 h-4" /> : <Pin className="w-4 h-4" />}
                            <span>{discussion.isPinned ? '取消置顶' : '置顶'}</span>
                          </button>
                          <button
                            onClick={() => handleToggleStatus('discussion', discussion.id, discussion.status)}
                            className={`px-3 py-1 text-sm rounded transition-colors duration-200 flex items-center space-x-1 ${
                              discussion.status === 'published' 
                                ? 'text-gray-600 border border-gray-300 hover:bg-gray-50' 
                                : 'text-white bg-green-600 hover:bg-green-700'
                            }`}
                          >
                            {discussion.status === 'published' ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                            <span>{discussion.status === 'published' ? '隐藏' : '发布'}</span>
                          </button>
                          <button
                            onClick={() => handleDeleteItem('discussion', discussion.id)}
                            className="px-3 py-1 text-sm text-white bg-red-600 rounded hover:bg-red-700 transition-colors duration-200 flex items-center space-x-1"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span>删除</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );

      case 'resources':
        return (
          <div className="bg-white rounded-xl shadow-lg">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">资源管理</h3>
                <button 
                  onClick={() => openModal('resource')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>添加资源</span>
                </button>
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="搜索资源..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">全部状态</option>
                  <option value="published">已发布</option>
                  <option value="hidden">已隐藏</option>
                </select>
              </div>
            </div>
            <div className="p-6">
              {resources.length === 0 ? (
                <div className="text-center py-12">
                  <Download className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">暂无资源</h3>
                  <p className="text-gray-600">点击上方按钮添加第一个资源。</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {resources
                    .filter(resource => 
                      (filterStatus === 'all' || resource.status === filterStatus) &&
                      (searchTerm === '' || resource.title.toLowerCase().includes(searchTerm.toLowerCase()))
                    )
                    .map((resource) => (
                    <div key={resource.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="font-medium text-gray-900">{resource.title}</h4>
                            {getStatusBadge(resource.status)}
                            <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                              {resource.category}
                            </span>
                          </div>
                          <div className="text-sm text-gray-600 mb-2">
                            <p><strong>作者：</strong>{resource.author} | <strong>类型：</strong>{resource.type} | <strong>上传时间：</strong>{formatDate(resource.createdAt)}</p>
                            <p><strong>下载量：</strong>{resource.downloads} {resource.size && `| 大小：${resource.size}`}</p>
                          </div>
                          {resource.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mb-2">
                              {resource.tags.map((tag, index) => (
                                <span key={index} className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          <button
                            onClick={() => handleToggleStatus('resource', resource.id, resource.status)}
                            className={`px-3 py-1 text-sm rounded transition-colors duration-200 flex items-center space-x-1 ${
                              resource.status === 'published' 
                                ? 'text-gray-600 border border-gray-300 hover:bg-gray-50' 
                                : 'text-white bg-green-600 hover:bg-green-700'
                            }`}
                          >
                            {resource.status === 'published' ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                            <span>{resource.status === 'published' ? '隐藏' : '发布'}</span>
                          </button>
                          <button
                            onClick={() => handleDeleteItem('resource', resource.id)}
                            className="px-3 py-1 text-sm text-white bg-red-600 rounded hover:bg-red-700 transition-colors duration-200 flex items-center space-x-1"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span>删除</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="bg-white rounded-xl shadow-lg">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">系统设置</h3>
                <button 
                  onClick={handleSaveSettings}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>保存设置</span>
                </button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              {/* 基本设置 */}
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4">基本设置</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">网站名称</label>
                    <input
                      type="text"
                      value={tempSettings.siteName}
                      onChange={(e) => setTempSettings({...tempSettings, siteName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">网站描述</label>
                    <input
                      type="text"
                      value={tempSettings.siteDescription}
                      onChange={(e) => setTempSettings({...tempSettings, siteDescription: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* 用户设置 */}
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4">用户设置</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-medium text-gray-900">允许用户注册</h5>
                      <p className="text-sm text-gray-600">是否允许新用户注册账户</p>
                    </div>
                    <button
                      onClick={() => setTempSettings({...tempSettings, allowRegistration: !tempSettings.allowRegistration})}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        tempSettings.allowRegistration ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        tempSettings.allowRegistration ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-medium text-gray-900">需要审核激活</h5>
                      <p className="text-sm text-gray-600">新用户注册后是否需要管理员审核</p>
                    </div>
                    <button
                      onClick={() => setTempSettings({...tempSettings, requireApproval: !tempSettings.requireApproval})}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        tempSettings.requireApproval ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        tempSettings.requireApproval ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                </div>
              </div>

              {/* 文件设置 */}
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4">文件设置</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">最大文件大小 (MB)</label>
                    <input
                      type="number"
                      value={tempSettings.maxFileSize}
                      onChange={(e) => setTempSettings({...tempSettings, maxFileSize: parseInt(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">允许的文件类型</label>
                    <input
                      type="text"
                      value={tempSettings.allowedFileTypes.join(', ')}
                      onChange={(e) => setTempSettings({...tempSettings, allowedFileTypes: e.target.value.split(',').map(type => type.trim())})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="pdf, doc, docx, zip"
                    />
                  </div>
                </div>
              </div>

              {/* 通知设置 */}
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4">通知设置</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-medium text-gray-900">邮件通知</h5>
                      <p className="text-sm text-gray-600">是否发送邮件通知</p>
                    </div>
                    <button
                      onClick={() => setTempSettings({...tempSettings, emailNotifications: !tempSettings.emailNotifications})}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        tempSettings.emailNotifications ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        tempSettings.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                </div>
              </div>

              {/* 维护模式 */}
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4">维护模式</h4>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <AlertTriangle className="w-5 h-5 text-yellow-600" />
                      <div>
                        <h5 className="font-medium text-yellow-900">维护模式</h5>
                        <p className="text-sm text-yellow-700">启用后，只有管理员可以访问网站</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setTempSettings({...tempSettings, maintenanceMode: !tempSettings.maintenanceMode})}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        tempSettings.maintenanceMode ? 'bg-yellow-600' : 'bg-gray-200'
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        tempSettings.maintenanceMode ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">功能开发中</h3>
            <p className="text-gray-600">该功能正在开发中，敬请期待。</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            {getRoleIcon(user?.role || '')}
            <h1 className="text-3xl font-bold text-gray-900">管理后台</h1>
          </div>
          <p className="text-gray-600">欢迎回来，{getRoleDisplayName(user?.role || 'member')} {user?.username}！</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64">
            <div className="bg-white rounded-xl shadow-lg p-4">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg transition-colors duration-200 ${
                      activeTab === tab.id
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {tab.icon}
                    <span>{tab.name}</span>
                    {tab.id === 'activation' && pendingUsers.filter(u => u.status === 'pending').length > 0 && (
                      <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-1">
                        {pendingUsers.filter(u => u.status === 'pending').length}
                      </span>
                    )}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {renderContent()}
          </div>
        </div>

        {/* Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={getModalTitle()}
          size={modalType === 'solution' ? 'xl' : 'lg'}
        >
          {renderModalContent()}
        </Modal>

        {/* User Detail Modal */}
        <Modal
          isOpen={isUserDetailModalOpen}
          onClose={() => setIsUserDetailModalOpen(false)}
          title="用户详细信息"
          size="md"
        >
          {selectedUser && (
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">
                    {selectedUser.username.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{selectedUser.username}</h3>
                  <p className="text-gray-600">{selectedUser.email}</p>
                  {getStatusBadge(selectedUser.status)}
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h4 className="font-medium text-gray-900 mb-2">申请信息</h4>
                <div className="space-y-2 text-sm">
                  <p><strong>申请时间：</strong>{formatDate(selectedUser.appliedAt)}</p>
                  {selectedUser.bio && (
                    <div>
                      <strong>个人简介：</strong>
                      <p className="mt-1 text-gray-600 bg-gray-50 p-3 rounded-lg">{selectedUser.bio}</p>
                    </div>
                  )}
                  {selectedUser.reason && (
                    <div>
                      <strong className="text-red-600">拒绝原因：</strong>
                      <p className="mt-1 text-red-600 bg-red-50 p-3 rounded-lg">{selectedUser.reason}</p>
                    </div>
                  )}
                </div>
              </div>

              {selectedUser.status === 'pending' && (
                <div className="border-t pt-4 flex space-x-3">
                  <button
                    onClick={() => {
                      handleApproveUser(selectedUser.id);
                      setIsUserDetailModalOpen(false);
                    }}
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>通过申请</span>
                  </button>
                  <button
                    onClick={() => {
                      handleRejectUser(selectedUser.id);
                      setIsUserDetailModalOpen(false);
                    }}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    <XCircle className="w-4 h-4" />
                    <span>拒绝申请</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </Modal>

        {/* Promote User Modal */}
        <Modal
          isOpen={isPromoteModalOpen}
          onClose={() => setIsPromoteModalOpen(false)}
          title="用户授权"
          size="md"
        >
          {selectedUser && isSuperAdmin && (
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  为用户 {selectedUser.username} 授予管理权限
                </h3>
                <p className="text-gray-600">请选择要授予的权限等级</p>
              </div>
              
              <div className="space-y-3">
                <button
                  onClick={() => handlePromoteUser('admin')}
                  className="w-full p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-left"
                >
                  <div className="flex items-center space-x-3">
                    <Star className="w-6 h-6 text-blue-500" />
                    <div>
                      <h4 className="font-medium text-gray-900">管理员</h4>
                      <p className="text-sm text-gray-600">日常管理权限，处理用户事务</p>
                    </div>
                  </div>
                </button>
                
                <button
                  onClick={() => handlePromoteUser('vice_admin')}
                  className="w-full p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-left"
                >
                  <div className="flex items-center space-x-3">
                    <Shield className="w-6 h-6 text-purple-500" />
                    <div>
                      <h4 className="font-medium text-gray-900">副站长</h4>
                      <p className="text-sm text-gray-600">协助站长管理，权限仅次于站长</p>
                    </div>
                  </div>
                </button>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-yellow-900">注意事项</h4>
                    <p className="text-sm text-yellow-700 mt-1">
                      授权后用户将获得相应的管理权限，请谨慎操作。站长权限无法转让。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default Admin;