import React, { useState } from 'react';
import { Search, Filter, Calendar, User, Eye, ThumbsUp, MessageCircle, Code, ExternalLink, BookOpen, Plus, Upload } from 'lucide-react';
import Modal from '../components/Modal';
import SolutionForm from '../components/forms/SolutionForm';

const Solutions: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = [
    { value: 'all', label: '全部' },
    { value: 'dp', label: '动态规划' },
    { value: 'graph', label: '图论' },
    { value: 'greedy', label: '贪心' },
    { value: 'math', label: '数学' },
    { value: 'string', label: '字符串' },
    { value: 'data-structure', label: '数据结构' }
  ];

  const difficulties = [
    { value: 'all', label: '全部难度' },
    { value: 'easy', label: '简单', color: 'text-green-600' },
    { value: 'medium', label: '中等', color: 'text-yellow-600' },
    { value: 'hard', label: '困难', color: 'text-red-600' }
  ];

  const handleSubmitSolution = (data: any) => {
    console.log('新题解:', data);
    // 这里可以添加保存到数据库的逻辑
    alert('题解已提交！感谢你的分享。');
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">题解分享</h1>
            <p className="text-xl text-gray-600 max-w-3xl">
              高质量算法题解，详细的思路分析和代码实现，助你快速提升编程能力
            </p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="mt-6 md:mt-0 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2 shadow-lg"
          >
            <Upload className="w-5 h-5" />
            <span>上传题解</span>
          </button>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="搜索题目、标签或作者..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
              
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {difficulties.map(difficulty => (
                  <option key={difficulty.value} value={difficulty.value}>
                    {difficulty.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Empty State */}
        <div className="text-center py-20">
          <div className="bg-white rounded-2xl shadow-lg p-12 max-w-2xl mx-auto">
            <BookOpen className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">暂无题解内容</h2>
            <p className="text-gray-600 mb-8">
              题解分享区域正在等待成员们的精彩内容。成员可以分享自己的解题思路、算法实现和学习心得，帮助其他同学更好地理解算法问题。
            </p>
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">题解内容将包含：</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 详细的问题分析与解题思路</li>
                  <li>• 完整的代码实现与注释说明</li>
                  <li>• 算法复杂度分析与优化建议</li>
                  <li>• 相关知识点的扩展学习</li>
                </ul>
              </div>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2 mx-auto"
              >
                <Plus className="w-5 h-5" />
                <span>分享第一个题解</span>
              </button>
            </div>
          </div>
        </div>

        {/* Features Preview */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <Code className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">代码高亮</h3>
            <p className="text-gray-600 text-sm">支持多种编程语言的语法高亮显示</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <MessageCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">互动讨论</h3>
            <p className="text-gray-600 text-sm">支持评论、点赞和问题讨论</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <Filter className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">智能分类</h3>
            <p className="text-gray-600 text-sm">按算法类型、难度等维度分类</p>
          </div>
        </div>

        {/* Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="上传题解"
          size="xl"
        >
          <SolutionForm
            onSubmit={handleSubmitSolution}
            onCancel={() => setIsModalOpen(false)}
          />
        </Modal>
      </div>
    </div>
  );
};

export default Solutions;