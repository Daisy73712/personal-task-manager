import { useTaskStore } from '@/store/taskStore';
import { CheckCircle, Info, AlertTriangle, XCircle, X } from 'lucide-react';

const toastStyles = {
  success: 'from-mint-400 to-mint-500',
  info: 'from-sky-400 to-sky-500',
  warning: 'from-peach-400 to-peach-500',
  error: 'from-bubblegum-500 to-bubblegum-600',
};

const toastIcons = {
  success: CheckCircle,
  info: Info,
  warning: AlertTriangle,
  error: XCircle,
};

export default function Toasts() {
  const { toasts, removeToast } = useTaskStore();

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-3">
      {toasts.map((toast, index) => {
        const Icon = toastIcons[toast.type];
        return (
          <div
            key={toast.id}
            className={`animate-slide-in-right bg-gradient-to-r ${toastStyles[toast.type]} text-white px-5 py-4 rounded-2xl shadow-lg flex items-center gap-3 min-w-72`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <Icon size={22} className="flex-shrink-0" />
            <span className="flex-1 font-medium">{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              className="hover:bg-white/20 rounded-full p-1 transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
