import React, { useState } from 'react';
import { Calendar, Clock, Trophy, Users, ExternalLink, Bell, MapPin, Award, Plus, CalendarPlus } from 'lucide-react';
import Modal from '../components/Modal';
import ContestForm from '../components/forms/ContestForm';

const Contests: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('upcoming');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const tabs = [
    { value: 'upcoming', label: '即将开始', count: 0 },
    { value: 'ongoing', label: '进行中', count: 0 },
    { value: 'past', label: '已结束', count: 0 }
  ];

  const handleSubmitContest = (data: any) => {
    console.log('新比赛信息:', data);
    // 这里可以添加保存到数据库的逻辑
    alert('比赛信息已添加！感谢你的贡献。');
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">比赛信息</h1>
            <p className="text-xl text-gray-600 max-w-3xl">
              及时获取最新的编程竞赛信息，不错过任何提升自己的机会
            </p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="mt-6 md:mt-0 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2 shadow-lg"
          >
            <CalendarPlus className="w-5 h-5" />
            <span>添加比赛信息</span>
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">0</div>
            <div className="text-gray-600">本月比赛</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">0</div>
            <div className="text-gray-600">今日比赛</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">0</div>
            <div className="text-gray-600">参赛人数</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">0</div>
            <div className="text-gray-600">获奖次数</div>
          </div>
        </div>

        {/* Contest Calendar Preview */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">本周赛事日历</h2>
          <div className="grid grid-cols-7 gap-2">
            {['周一', '周二', '周三', '周四', '周五', '周六', '周日'].map((day, index) => (
              <div key={index} className="text-center">
                <div className="text-sm font-medium text-gray-600 mb-2">{day}</div>
                <div className="h-16 bg-gray-50 rounded-lg flex items-center justify-center relative">
                  <span className="text-sm text-gray-500">{13 + index}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center text-gray-500 text-sm">
            暂无比赛安排，管理员会及时更新最新的竞赛信息
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setSelectedTab(tab.value)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                    selectedTab === tab.value
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                  <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                    selectedTab === tab.value ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Empty State */}
        <div className="text-center py-20">
          <div className="bg-white rounded-2xl shadow-lg p-12 max-w-2xl mx-auto">
            <Trophy className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">比赛信息待更新</h2>
            <p className="text-gray-600 mb-8">
              我们会及时收集和发布各类编程竞赛的信息，包括报名时间、比赛规则、奖项设置等详细内容，帮助成员们不错过任何重要的比赛机会。
            </p>
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">比赛信息将包含：</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Codeforces、AtCoder等平台的定期比赛</li>
                  <li>• ICPC、CCPC等重要算法竞赛</li>
                  <li>• Google Code Jam、Facebook Hacker Cup等企业竞赛</li>
                  <li>• 各类编程马拉松和在线挑战赛</li>
                </ul>
              </div>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2 mx-auto"
              >
                <Plus className="w-5 h-5" />
                <span>添加第一个比赛</span>
              </button>
            </div>
          </div>
        </div>

        {/* Contest Tips */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8">
          <div className="text-center">
            <Trophy className="w-16 h-16 text-white mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-white mb-4">参赛小贴士</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <Clock className="w-8 h-8 text-blue-200 mx-auto mb-2" />
                <h3 className="text-lg font-semibold text-white mb-2">合理分配时间</h3>
                <p className="text-blue-100 text-sm">先做简单题目，确保得到基础分数</p>
              </div>
              <div className="text-center">
                <Users className="w-8 h-8 text-blue-200 mx-auto mb-2" />
                <h3 className="text-lg font-semibold text-white mb-2">团队协作</h3>
                <p className="text-blue-100 text-sm">ICPC等团队赛事要注重配合与沟通</p>
              </div>
              <div className="text-center">
                <Award className="w-8 h-8 text-blue-200 mx-auto mb-2" />
                <h3 className="text-lg font-semibold text-white mb-2">保持冷静</h3>
                <p className="text-blue-100 text-sm">遇到困难不要慌张，仔细分析问题</p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="添加比赛信息"
          size="lg"
        >
          <ContestForm
            onSubmit={handleSubmitContest}
            onCancel={() => setIsModalOpen(false)}
          />
        </Modal>
      </div>
    </div>
  );
};

export default Contests;