import React, { useState } from 'react';
import { MessageSquare, Tag, Save, X } from 'lucide-react';

interface DiscussionFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const DiscussionForm: React.FC<DiscussionFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    tags: ''
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
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <MessageSquare className="w-4 h-4 inline mr-2" />
          讨论标题
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="请输入讨论标题"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          讨论分类
        </label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">请选择分类</option>
          <option value="algorithm">算法讨论</option>
          <option value="contest">比赛交流</option>
          <option value="help">求助问答</option>
          <option value="share">经验分享</option>
        </select>
      </div>

      <div>
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

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          讨论内容
        </label>
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          required
          rows={8}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="请详细描述你想讨论的内容..."
        />
      </div>

      <div className="bg-blue-50 rounded-lg p-4">
        <h4 className="text-sm font-medium text-blue-900 mb-2">发布提示</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• 请确保标题简洁明了，能够准确概括讨论内容</li>
          <li>• 选择合适的分类有助于其他成员快速找到相关讨论</li>
          <li>• 详细的内容描述有助于获得更好的回复</li>
          <li>• 遵守社区规范，保持友善和尊重的交流氛围</li>
        </ul>
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
          <span>发起讨论</span>
        </button>
      </div>
    </form>
  );
};

export default DiscussionForm;