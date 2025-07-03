import React, { useState } from 'react';
import { Download, FileText, Code, Book, Video, ExternalLink, Search, Filter, Calendar, User, Upload, FolderOpen, Plus } from 'lucide-react';
import Modal from '../components/Modal';
import ResourceForm from '../components/forms/ResourceForm';

const Resources: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = [
    { value: 'all', label: '全部资源' },
    { value: 'template', label: '代码模板' },
    { value: 'tutorial', label: '教程文档' },
    { value: 'book', label: '电子书籍' },
    { value: 'video', label: '视频课程' },
    { value: 'tool', label: '工具软件' }
  ];

  const handleSubmitResource = (data: any) => {
    console.log('新资源:', data);
    // 这里可以添加保存到数据库的逻辑
    alert('资源已上传！感谢你的分享。');
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">资源下载</h1>
            <p className="text-xl text-gray-600 max-w-3xl">
              精选的学习资料、代码模板、工具软件，助力你的算法学习之路
            </p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="mt-6 md:mt-0 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2 shadow-lg"
          >
            <Upload className="w-5 h-5" />
            <span>上传资源</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">0</div>
            <div className="text-gray-600">精选资源</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">0</div>
            <div className="text-gray-600">总下载量</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">6</div>
            <div className="text-gray-600">资源分类</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">待定</div>
            <div className="text-gray-600">更新频率</div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="搜索资源名称、描述或标签..."
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
            </div>
          </div>
        </div>

        {/* Empty State */}
        <div className="text-center py-20">
          <div className="bg-white rounded-2xl shadow-lg p-12 max-w-2xl mx-auto">
            <FolderOpen className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">资源库正在建设中</h2>
            <p className="text-gray-600 mb-8">
              我们正在收集和整理各类学习资源。成员们可以上传和分享有价值的学习材料，包括代码模板、教程文档、电子书籍等，共同构建丰富的资源库。
            </p>
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">资源类型包括：</h3>
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <Code className="w-4 h-4" />
                    <span>代码模板</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FileText className="w-4 h-4" />
                    <span>教程文档</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Book className="w-4 h-4" />
                    <span>电子书籍</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Video className="w-4 h-4" />
                    <span>视频课程</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2 mx-auto"
              >
                <Plus className="w-5 h-5" />
                <span>上传第一个资源</span>
              </button>
            </div>
          </div>
        </div>

        {/* Upload CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-12">
            <Upload className="w-16 h-16 text-white mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-white mb-4">分享你的资源</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              如果你有优质的学习资料或者实用工具，欢迎与社区成员分享，共同构建更好的学习环境
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                上传资源
              </button>
              <a
                href="mailto:admin@alopsemly.com"
                className="px-8 py-3 bg-transparent text-white font-semibold rounded-lg border-2 border-white hover:bg-white hover:text-blue-600 transition-colors duration-200"
              >
                联系管理员
              </a>
            </div>
          </div>
        </div>

        {/* Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="上传资源"
          size="lg"
        >
          <ResourceForm
            onSubmit={handleSubmitResource}
            onCancel={() => setIsModalOpen(false)}
          />
        </Modal>
      </div>
    </div>
  );
};

export default Resources;