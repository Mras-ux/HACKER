import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { User, Lock, Eye, EyeOff, AlertCircle, UserPlus } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Login: React.FC = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    if (isLoginMode) {
      // 登录逻辑
      try {
        const success = await login(username, password);
        if (success) {
          navigate(from, { replace: true });
        } else {
          setError('用户名或密码错误');
        }
      } catch (err) {
        setError('登录失败，请重试');
      }
    } else {
      // 注册逻辑
      if (password !== confirmPassword) {
        setError('两次输入的密码不一致');
        setIsLoading(false);
        return;
      }
      
      if (password.length < 6) {
        setError('密码长度至少为6位');
        setIsLoading(false);
        return;
      }

      // 模拟注册API调用
      try {
        await new Promise(resolve => setTimeout(resolve, 1000)); // 模拟网络延迟
        setSuccess('注册成功！请联系管理员激活账户。');
        // 清空表单
        setUsername('');
        setPassword('');
        setConfirmPassword('');
        setEmail('');
        // 3秒后切换到登录模式
        setTimeout(() => {
          setIsLoginMode(true);
          setSuccess('');
        }, 3000);
      } catch (err) {
        setError('注册失败，请重试');
      }
    }
    
    setIsLoading(false);
  };

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
    setError('');
    setSuccess('');
    setUsername('');
    setPassword('');
    setConfirmPassword('');
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center">
              <span className="text-white font-bold text-2xl">H</span>
            </div>
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            {isLoginMode ? '登录到 HACKER交流会' : '注册 HACKER交流会 账户'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {isLoginMode ? '欢迎回来！请登录您的账户' : '加入我们的算法学习社区'}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                <span className="text-red-700 text-sm">{error}</span>
              </div>
            )}

            {success && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3">
                <UserPlus className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-green-700 text-sm">{success}</span>
              </div>
            )}

            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                用户名
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                  placeholder="请输入用户名"
                />
              </div>
            </div>

            {!isLoginMode && (
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  邮箱地址
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required={!isLoginMode}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                    placeholder="请输入邮箱地址"
                  />
                </div>
              </div>
            )}

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                密码
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                  placeholder={isLoginMode ? "请输入密码" : "请设置密码（至少6位）"}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {!isLoginMode && (
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  确认密码
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    required={!isLoginMode}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                    placeholder="请再次输入密码"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {isLoginMode && (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    记住我
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200">
                    忘记密码？
                  </a>
                </div>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>{isLoginMode ? '登录中...' : '注册中...'}</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    {isLoginMode ? (
                      <User className="w-4 h-4" />
                    ) : (
                      <UserPlus className="w-4 h-4" />
                    )}
                    <span>{isLoginMode ? '登录' : '注册账户'}</span>
                  </div>
                )}
              </button>
            </div>
          </form>

          {/* Mode Toggle */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="text-center">
              <p className="text-sm text-gray-600">
                {isLoginMode ? '还没有账户？' : '已有账户？'}
                <button
                  onClick={toggleMode}
                  className="ml-1 font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200"
                >
                  {isLoginMode ? '立即注册' : '立即登录'}
                </button>
              </p>
            </div>
          </div>

          {/* Demo Accounts Info - Only show in login mode */}
          {isLoginMode && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-4">测试账户</p>
                <div className="space-y-2 text-xs text-gray-500">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p><strong>管理员：</strong> admin / admin123</p>
                    <p><strong>普通用户：</strong> member / member123</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Registration Notice - Only show in register mode */}
          {!isLoginMode && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h4 className="text-sm font-medium text-blue-900">注册说明</h4>
                    <p className="text-sm text-blue-700 mt-1">
                      注册后需要管理员审核激活账户。我们会在24小时内处理您的申请，请耐心等待。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;