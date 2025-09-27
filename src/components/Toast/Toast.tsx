import React, { useEffect, useState } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

export interface ToastProps {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message: string;
  duration?: number;
  closable?: boolean;
  onClose?: (id: string) => void;
}

const iconMap = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
};

const colorMap = {
  success: {
    icon: 'text-green-500',
    border: 'border-green-500/20',
  },
  error: {
    icon: 'text-red-500',
    border: 'border-red-500/20',
  },
  warning: {
    icon: 'text-yellow-500',
    border: 'border-yellow-500/20',
  },
  info: {
    icon: 'text-blue-500',
    border: 'border-blue-500/20',
  },
};

export const Toast: React.FC<ToastProps> = ({
  id,
  type,
  title,
  message,
  duration,
  closable = true,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);
  const IconComponent = iconMap[type];
  const colors = colorMap[type];

  useEffect(() => {
    const showTimer = setTimeout(() => setIsVisible(true), 10);
    if (!duration) return;

    const hideTimer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [duration]);

  const handleClose = () => {
    setIsLeaving(true);
    setTimeout(() => {
      onClose?.(id);
    }, 300);
  };

  const getAnimationClasses = () => {
    const baseClasses = 'transition-all duration-300 ease-in-out';

    if (isLeaving) {
      return `${baseClasses} opacity-0 scale-95 translate-y-2`;
    }

    if (isVisible) {
      return `${baseClasses} opacity-100 scale-100 translate-y-0`;
    }

    return `${baseClasses} opacity-0 scale-95 translate-y-2`;
  };

  return (
    <div
      className={`
        fixed z-50 w-full
        bottom-0 right-0 left-0 p-2
        sm:bottom-4 sm:right-4 sm:left-auto sm:max-w-sm
        ${getAnimationClasses()}
        `}
      role="alert"
    >
      <div
        className={`
          group pointer-events-auto w-full overflow-hidden rounded-md border 
          bg-[var(--background)] p-6 shadow-lg transition-all
          hover:shadow-xl
          ${colors.border}
        `}
      >
        <div className="flex gap-4">
          <div className="flex-shrink-0">
            <IconComponent className={`h-5 w-5 ${colors.icon}`} />
          </div>
          <div className="grid flex-1 gap-1">
            {title && <div className="text-sm font-semibold">{title}</div>}
            <div className="text-sm opacity-90">{message}</div>
          </div>
          {closable && (
            <button
              type="button"
              onClick={handleClose}
              className="
                inline-flex h-8 w-8 shrink-0 items-center justify-center 
                rounded-md bg-transparent text-foreground/50"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
      <div className="h-1 bg-black bg-opacity-10 rounded-b-2xl overflow-hidden">
        <div
          className={`h-full ${colors.icon.replace('text-', 'bg-')} transition-all ease-linear`}
          style={{
            animation: `toast-shrink ${duration}ms linear forwards`,
          }}
        />
      </div>
    </div>
  );
};

export interface ToastContainerProps {
  toasts: ToastProps[];
  onClose: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({
  toasts,
  onClose,
}) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} onClose={onClose} />
      ))}
    </div>
  );
};
