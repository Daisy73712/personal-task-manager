import { useState } from 'react';
import { useTaskStore } from '@/store/taskStore';
import { X, Mail, Lock, User, Sparkles } from 'lucide-react';

export default function AuthModal() {
  const { authModalOpen, authModalMode, closeAuthModal, login, signup, openAuthModal } = useTaskStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const isLogin = authModalMode === 'login';
  const isSignup = authModalMode === 'signup';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      login(email, password);
    } else if (isSignup) {
      signup(name, email, password);
    }
    setEmail('');
    setPassword('');
    setName('');
  };

  const switchMode = (mode: 'login' | 'signup') => {
    openAuthModal(mode);
    setEmail('');
    setPassword('');
    setName('');
  };

  if (!authModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={closeAuthModal}
      />
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden animate-slide-up">
        <div className="bg-gradient-to-r from-bubblegum-400 via-lavender-400 to-periwinkle-400 p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-white/20 flex items-center justify-center text-3xl animate-float">
            ✨
          </div>
          <h2 className="text-2xl font-display font-bold text-white">
            {isLogin ? 'Welcome Back! 💕' : 'Join SparkleTask ✨'}
          </h2>
          <p className="text-white/80 text-sm mt-1">
            {isLogin
              ? 'Sign in to your magical task list'
              : 'Create your account and get organized'}
          </p>
          <button
            onClick={closeAuthModal}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {isSignup && (
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <User size={16} className="text-bubblegum-500" />
                Your Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="What's your name?"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-bubblegum-300 transition-colors text-gray-700"
              />
            </div>
          )}

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Mail size={16} className="text-lavender-500" />
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-lavender-300 transition-colors text-gray-700"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Lock size={16} className="text-sky-500" />
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-sky-300 transition-colors text-gray-700"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-bubblegum-400 to-lavender-400 text-white font-semibold hover:shadow-lg hover:shadow-bubblegum-200 transition-all hover:scale-105 flex items-center justify-center gap-2"
          >
            <Sparkles size={18} />
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>

          <div className="text-center text-sm text-gray-500">
            {isLogin ? (
              <>
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => switchMode('signup')}
                  className="text-bubblegum-500 font-medium hover:text-bubblegum-600"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => switchMode('login')}
                  className="text-bubblegum-500 font-medium hover:text-bubblegum-600"
                >
                  Sign in
                </button>
              </>
            )}
          </div>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-3 bg-white text-gray-400">or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => {
                if (isLogin) {
                  login('demo@sparkletask.com', 'demo123');
                } else {
                  signup('Demo User', 'demo@sparkletask.com', 'demo123');
                }
              }}
              className="py-2.5 rounded-xl border-2 border-gray-100 text-gray-600 font-medium hover:border-bubblegum-200 hover:bg-bubblegum-50 transition-all text-sm flex items-center justify-center gap-2"
            >
              <span>🎀</span>
              Demo Account
            </button>
            <button
              type="button"
              onClick={() => {
                if (isLogin) {
                  login('guest@sparkletask.com', 'guest');
                } else {
                  signup('Guest', 'guest@sparkletask.com', 'guest');
                }
              }}
              className="py-2.5 rounded-xl border-2 border-gray-100 text-gray-600 font-medium hover:border-lavender-200 hover:bg-lavender-50 transition-all text-sm flex items-center justify-center gap-2"
            >
              <span>👋</span>
              Guest Mode
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
