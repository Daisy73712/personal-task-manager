import { useState } from 'react';
import { useTaskStore } from '@/store/taskStore';
import { LogOut, User as UserIcon, Settings, Heart } from 'lucide-react';

export default function UserMenu() {
  const { user, logout, openAuthModal } = useTaskStore();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    if (!user) {
      openAuthModal('login');
    } else {
      setIsOpen(!isOpen);
    }
  };

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleMenu}
        className="w-11 h-11 rounded-full bg-gradient-to-br from-peach-300 to-bubblegum-400 flex items-center justify-center text-white font-bold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 overflow-hidden"
      >
        {user ? (
          <span className="text-lg">{user.name.charAt(0).toUpperCase()}</span>
        ) : (
          <span>👩</span>
        )}
      </button>

      {isOpen && user && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-pink-100 overflow-hidden z-50 animate-slide-up">
            <div className="bg-gradient-to-r from-bubblegum-400 to-lavender-400 p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-xl">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold text-white">{user.name}</p>
                  <p className="text-xs text-white/80">{user.email}</p>
                </div>
              </div>
            </div>
            <div className="p-2">
              <button
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-700 hover:bg-bubblegum-50 transition-colors text-sm"
              >
                <UserIcon size={18} className="text-bubblegum-500" />
                My Profile
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-700 hover:bg-lavender-50 transition-colors text-sm"
              >
                <Settings size={18} className="text-lavender-500" />
                Settings
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-700 hover:bg-peach-50 transition-colors text-sm"
              >
                <Heart size={18} className="text-peach-500" />
                Favorites
              </button>
              <div className="border-t border-gray-100 my-2" />
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-bubblegum-600 hover:bg-bubblegum-50 transition-colors text-sm font-medium"
              >
                <LogOut size={18} />
                Log Out
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
