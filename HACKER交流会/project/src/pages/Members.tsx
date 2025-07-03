import React, { useState } from 'react';
import { Github, Mail, Award, MapPin, Users, UserPlus, Link } from 'lucide-react';
import Modal from '../components/Modal';
import MemberForm from '../components/forms/MemberForm';

const Members: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddMember = (data: any) => {
    console.log('新成员信息:', data);
    // 这里可以添加保存到数据库的逻辑
    alert('成员信息已提交！管理员会尽快审核。');
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-16">
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">团队成员</h1>
            <p className="text-xl text-gray-600 max-w-3xl">
              我们是一群热爱算法、追求卓越的年轻人，致力于在编程竞赛的道路上互相帮助、共同成长
            </p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="mt-6 md:mt-0 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2 shadow-lg"
          >
            <UserPlus className="w-5 h-5" />
            <span>添加成员信息</span>
          </button>
        </div>

        {/* Empty State */}
        <div className="text-center py-20">
          <div className="bg-white rounded-2xl shadow-lg p-12 max-w-2xl mx-auto">
            <Users className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">团队成员信息待完善</h2>
            <p className="text-gray-600 mb-8">
              我们正在收集和整理团队成员的详细信息。成员们可以通过上方按钮添加自己的个人资料，包括技能专长、主要成就等信息。
            </p>
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">成员信息将包含：</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 个人简介与专业背景</li>
                  <li>• 技能专长与研究方向</li>
                  <li>• 竞赛成就与获奖经历</li>
                  <li>• 联系方式与社交链接</li>
                </ul>
              </div>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2 mx-auto"
              >
                <UserPlus className="w-5 h-5" />
                <span>提交我的信息</span>
              </button>
            </div>
          </div>
        </div>

        {/* Join Us CTA */}
        <section className="mt-20 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-12">
            <UserPlus className="w-16 h-16 text-white mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-white mb-4">想要加入我们？</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              如果你对算法竞赛充满热情，愿意与我们一起学习成长，欢迎申请加入HACKER交流会
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:admin@hacker.com"
                className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                联系我们
              </a>
              <Link
                to="/login"
                className="px-8 py-3 bg-transparent text-white font-semibold rounded-lg border-2 border-white hover:bg-white hover:text-blue-600 transition-colors duration-200"
              >
                立即加入
              </Link>
            </div>
          </div>
        </section>

        {/* Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="添加成员信息"
          size="lg"
        >
          <MemberForm
            onSubmit={handleAddMember}
            onCancel={() => setIsModalOpen(false)}
          />
        </Modal>
      </div>
    </div>
  );
};

export default Members;