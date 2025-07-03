import React, { useState } from 'react';
import { Code, FileText, Tag, ExternalLink, Save, X } from 'lucide-react';

interface SolutionFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const SolutionForm: React.FC<SolutionFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    problemUrl: '',
    difficulty: '',
    category: '',
    tags: '',
    description: '',
    solution: '',
    code: '',
    complexity: '',
    author: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <FileText className="w-4 h-4 inline mr-2" />
            题目标题
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="请输入题目标题"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <ExternalLink className="w-4 h-4 inline mr-2" />
            题目链接
          </label>
          <input
            type="url"
            name="problemUrl"
            value={formData.problemUrl}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="题目原始链接"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            难度
          </label>
          <select
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">请选择难度</option>
            <option value="easy">简单</option>
            <option value="medium">中等</option>
            <option value="hard">困难</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            算法分类
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">请选择分类</option>
            <option value="dp">动态规划</option>
            <option value="graph">图论</option>
            <option value="greedy">贪心</option>
            <option value="math">数学</option>
            <option value="string">字符串</option>
            <option value="data-structure">数据结构</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Tag className="w-4 h-4 inline mr-2" />
            标签
          </label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="请输入标签，用逗号分隔"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          题目描述
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="请描述题目内容和要求..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          解题思路
        </label>
        <textarea
          name="solution"
          value={formData.solution}
          onChange={handleChange}
          required
          rows={6}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="请详细描述解题思路和算法分析..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <Code className="w-4 h-4 inline mr-2" />
          代码实现
        </label>
        <textarea
          name="code"
          value={formData.code}
          onChange={handleChange}
          required
          rows={8}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
          placeholder="请粘贴完整的代码实现..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          复杂度分析
        </label>
        <textarea
          name="complexity"
          value={formData.complexity}
          onChange={handleChange}
          rows={2}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="时间复杂度和空间复杂度分析..."
        />
      </div>

      <div className="flex justify-end space-x-4 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center space-x-2"
        >
          <X className="w-4 h-4" />
          <span>取消</span>
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
        >
          <Save className="w-4 h-4" />
          <span>发布题解</span>
        </button>
      </div>
    </form>
  );
};

export default SolutionForm;