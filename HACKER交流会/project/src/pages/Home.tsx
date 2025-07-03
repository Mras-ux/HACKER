import React from 'react';
import { Link } from 'react-router-dom';
import { Users, BookOpen, Download, MessageSquare, Trophy, TrendingUp, Code, Target } from 'lucide-react';

const Home: React.FC = () => {
  const features = [
    {
      icon: <Users className="w-8 h-8" />,
      title: '专业团队',
      description: '汇聚算法竞赛精英，经验丰富的指导团队',
      link: '/members'
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: '题解分享',
      description: '高质量算法题解，详细思路分析',
      link: '/solutions'
    },
    {
      icon: <Download className="w-8 h-8" />,
      title: '资源下载',
      description: '精选学习资料，工具软件免费分享',
      link: '/resources'
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: '交流讨论',
      description: '活跃的社区氛围，问题解答及时',
      link: '/discussion'
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: '比赛信息',
      description: '最新竞赛资讯，报名指导服务',
      link: '/contests'
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: '持续进步',
      description: '系统化学习路径，能力提升有保障',
      link: '#'
    }
  ];

  const stats = [
    { label: '活跃成员', value: '0' },
    { label: '题解分享', value: '0' },
    { label: '资源下载', value: '0' },
    { label: '讨论主题', value: '0' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              <span className="text-blue-600">HACKER</span>交流会
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              专注于算法竞赛与编程学习的优秀团队，为每位成员提供专业的指导与丰富的资源
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/members"
                className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg"
              >
                了解我们
              </Link>
              <Link
                to="/solutions"
                className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors duration-200 shadow-lg border border-blue-200"
              >
                开始学习
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-20 right-20 w-16 h-16 bg-indigo-200 rounded-full opacity-20 animate-bounce delay-150"></div>
        <div className="absolute bottom-10 left-1/4 w-12 h-12 bg-purple-200 rounded-full opacity-20 animate-bounce delay-300"></div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              为什么选择我们
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              我们致力于为每位算法学习者提供最优质的学习环境和资源支持
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Link
                key={index}
                to={feature.link}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
              >
                <div className="text-blue-600 mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              欢迎来到HACKER交流会
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              我们正在建设一个充满活力的算法学习社区。当成员们开始分享题解、上传资源、参与讨论时，这里将展示最新的动态和内容更新。
            </p>
            <div className="bg-gray-50 rounded-xl p-8 max-w-2xl mx-auto">
              <div className="text-gray-500 mb-4">
                <Code className="w-16 h-16 mx-auto mb-4" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">内容正在建设中</h3>
              <p className="text-gray-600">
                期待成员们的精彩内容分享，让我们一起构建这个学习平台！
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-6">
            <Code className="w-12 h-12 text-white mr-4" />
            <Target className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            准备好开始你的算法之旅了吗？
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            加入HACKER交流会，与志同道合的伙伴一起学习成长，在算法竞赛的道路上走得更远
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/login"
              className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200 shadow-lg"
            >
              立即加入
            </Link>
            <Link
              to="/solutions"
              className="px-8 py-3 bg-transparent text-white font-semibold rounded-lg border-2 border-white hover:bg-white hover:text-blue-600 transition-colors duration-200"
            >
              浏览题解
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;