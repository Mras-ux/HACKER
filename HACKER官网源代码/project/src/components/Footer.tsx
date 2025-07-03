import React from 'react';
import { Github, Mail, MessageCircle } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">H</span>
              </div>
              <span className="text-xl font-bold">HACKER交流会</span>
            </div>
            <p className="text-gray-400 text-sm">
              致力于算法学习与竞赛交流，共同进步，追求卓越。
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">快速导航</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-400 hover:text-white transition-colors">首页</a></li>
              <li><a href="/members" className="text-gray-400 hover:text-white transition-colors">成员介绍</a></li>
              <li><a href="/solutions" className="text-gray-400 hover:text-white transition-colors">题解分享</a></li>
              <li><a href="/resources" className="text-gray-400 hover:text-white transition-colors">资源下载</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">社区</h3>
            <ul className="space-y-2">
              <li><a href="/discussion" className="text-gray-400 hover:text-white transition-colors">讨论区</a></li>
              <li><a href="/contests" className="text-gray-400 hover:text-white transition-colors">比赛信息</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">常见问题</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">帮助中心</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">联系我们</h3>
            <div className="space-y-3">
              <a href="#" className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
                <span>GitHub</span>
              </a>
              <a href="#" className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
                <span>邮箱联系</span>
              </a>
              <a href="#" className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
                <MessageCircle className="w-5 h-5" />
                <span>在线客服</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 HACKER交流会. 保留所有权利。
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">隐私政策</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">服务条款</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">使用帮助</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;