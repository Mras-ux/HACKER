import React, { useState } from 'react';
import { MessageSquare, ThumbsUp, MessageCircle, Clock, User, Pin, Siren as Fire, TrendingUp, Plus, Users, Edit } from 'lucide-react';
import Modal from '../components/Modal';
import DiscussionForm from '../components/forms/DiscussionForm';

const Discussion: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('latest');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = [
    { value: 'all', label: '全部讨论', icon: <MessageSquare className="w-4 h-4" /> },
    { value: 'algorithm', label: '算法讨论', icon: <TrendingUp className="w-4 h-4" /> },
    { value: 'contest', label: '比赛交流', icon: <Fire className="w-4 h-4" /> },
    { value: 'help', label: '求助问答', icon: <MessageCircle className="w-4 h-4" /> },
    { value: 'share', label: '经验分享', icon: <ThumbsUp className="w-4 h-4" /> }
  ];

  const sortOptions = [
    { value: 'latest', label: '最新回复' },
    { value: 'popular', label: '最多回复' },
    { value: 'hot', label: '最多点赞' }
  ];

  const handleSubmitDiscussion = (data: any) => {
    console.log('新讨论:', data);
    // 这里可以添加保存到数据库的逻辑
    alert('讨论已发起！感谢你的参与。');
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">讨论区</h1>
            <p className="text-xl text-gray-600">
              与同伴交流学习心得，分享解题思路，共同进步
            </p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="mt-4 md:mt-0 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2 shadow-lg"
          >
            <Edit className="w-5 h-5" />
            <span>发起讨论</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">讨论分类</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.value}
                    onClick={() => setSelectedCategory(category.value)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors duration-200 ${
                      selectedCategory === category.value
                        ? 'bg-blue-100 text-blue-800'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {category.icon}
                    <span>{category.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">社区统计</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">总讨论数</span>
                  <span className="font-semibold text-gray-900">0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">今日新增</span>
                  <span className="font-semibold text-green-600">0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">活跃用户</span>
                  <span className="font-semibold text-blue-600">0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">本周热门</span>
                  <span className="font-semibold text-red-600">0</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Sort Options */}
            <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-gray-700">排序方式：</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {sortOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="text-sm text-gray-500">
                  共 0 个讨论
                </div>
              </div>
            </div>

            {/* Empty State */}
            <div className="text-center py-20">
              <div className="bg-white rounded-2xl shadow-lg p-12">
                <Users className="w-24 h-24 text-gray-300 mx-auto mb-6" />
                <h2 className="text-2xl font-bold text-gray-900 mb-4">讨论区等待你的参与</h2>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  这里将是成员们交流学习心得、分享解题思路、互相帮助的地方。快来发起第一个讨论话题吧！
                </p>
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">讨论内容包括：</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 算法问题的讨论与解答</li>
                      <li>• 竞赛经验的分享与交流</li>
                      <li>• 学习资源的推荐与评价</li>
                      <li>• 编程技巧的探讨与改进</li>
                    </ul>
                  </div>
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2 mx-auto"
                  >
                    <Plus className="w-5 h-5" />
                    <span>发起第一个讨论</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="发起讨论"
          size="lg"
        >
          <DiscussionForm
            onSubmit={handleSubmitDiscussion}
            onCancel={() => setIsModalOpen(false)}
          />
        </Modal>
      </div>
    </div>
  );
};

export default Discussion;