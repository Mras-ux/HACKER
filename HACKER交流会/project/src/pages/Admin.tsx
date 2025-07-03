import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Users, FileText, MessageSquare, Download, Settings, BarChart3, Plus, Edit, Trash2, UserPlus, Upload, CalendarPlus } from 'lucide-react';
import Modal from '../components/Modal';
import MemberForm from '../components/forms/MemberForm';
import SolutionForm from '../components/forms/SolutionForm';
import ResourceForm from '../components/forms/ResourceForm';
import DiscussionForm from '../components/forms/DiscussionForm';
import ContestForm from '../components/forms/ContestForm';

const Admin: React.FC = () => {
  const { user, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'member' | 'solution' | 'resource' | 'discussion' | 'contest'>('member');

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
    { id: 'solutions', name: '题解管理', icon: <FileText className="w-5 h-5" /> },
    { id: 'discussions', name: '讨论管理', icon: <MessageSquare className="w-5 h-5" /> },
    { id: 'resources', name: '资源管理', icon: <Download className="w-5 h-5" /> },
    { id: 'settings', name: '系统设置', icon: <Settings className="w-5 h-5" /> }
  ];

  const stats = [
    { name: '总用户数', value: '1', change: '新站点', color: 'text-blue-600' },
    { name: '题解数量', value: '0', change: '等待内容', color: 'text-green-600' },
    { name: '讨论主题', value: '0', change: '等待内容', color: 'text-purple-600' },
    { name: '资源下载', value: '0', change: '等待内容', color: 'text-orange-600' }
  ];

  const openModal = (type: typeof modalType) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const handleSubmit = (data: any) => {
    console.log(`${modalType} 数据:`, data);
    alert(`${modalType === 'member' ? '成员信息' : modalType === 'solution' ? '题解' : modalType === 'resource' ? '资源' : modalType === 'discussion' ? '讨论' : '比赛信息'}已添加！`);
    setIsModalOpen(false);
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

            {/* Welcome Message */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">欢迎使用管理后台</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">网站初始化完成</h4>
                  <p className="text-gray-600 mb-4">
                    HACKER交流会官方网站已成功部署。所有功能模块已就绪，等待内容填充。
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• 用户认证系统已启用</li>
                    <li>• 所有页面模块已部署</li>
                    <li>• 管理后台功能正常</li>
                    <li>• 响应式设计已适配</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">下一步操作建议</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• 邀请团队成员注册账户</li>
                    <li>• 开始发布第一批题解内容</li>
                    <li>• 上传学习资源和工具</li>
                    <li>• 发起讨论话题活跃社区</li>
                    <li>• 更新比赛信息和日历</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">快速操作</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <button 
                  onClick={() => openModal('member')}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-left"
                >
                  <UserPlus className="w-6 h-6 text-blue-600 mb-2" />
                  <h4 className="font-medium text-gray-900">添加成员</h4>
                  <p className="text-sm text-gray-600">添加新的团队成员信息</p>
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

      case 'users':
        return (
          <div className="bg-white rounded-xl shadow-lg">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">用户管理</h3>
                <button 
                  onClick={() => openModal('member')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>添加用户</span>
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">暂无用户数据</h3>
                <p className="text-gray-600">等待用户注册后，这里将显示用户列表和管理选项。</p>
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
          <h1 className="text-3xl font-bold text-gray-900">管理后台</h1>
          <p className="text-gray-600 mt-2">欢迎回来，{user?.username}！</p>
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
      </div>
    </div>
  );
};

export default Admin;