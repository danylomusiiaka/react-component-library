import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from 'react';
import { ToastContainer, ToastProps } from './Toast';
import { v4 as uuidv4 } from 'uuid';

interface ToastContextType {
  toasts: ToastProps[];
  addToast: (toast: Omit<ToastProps, 'id'>) => string;
  removeToast: (id: string) => void;
  clearAllToasts: () => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const addToast = useCallback((toast: Omit<ToastProps, 'id'>) => {
    const id = uuidv4();
    const newToast: ToastProps = {
      ...toast,
      id,
    };

    setToasts((prevToasts) => {
      return [...prevToasts, newToast];
    });

    return id;
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  const clearAllToasts = useCallback(() => {
    setToasts([]);
  }, []);

  const value: ToastContextType = {
    toasts,
    addToast,
    removeToast,
    clearAllToasts,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </ToastContext.Provider>
  );
};

export const useToastActions = () => {
  const { addToast, removeToast, clearAllToasts } = useToast();

  const showSuccess = (message: string, title?: string, duration?: number) => {
    return addToast({
      type: 'success',
      message,
      title,
      duration,
    });
  };

  const showError = (message: string, title?: string, duration?: number) => {
    return addToast({
      type: 'error',
      message,
      title,
      duration,
    });
  };

  const showWarning = (message: string, title?: string, duration?: number) => {
    return addToast({
      type: 'warning',
      message,
      title,
      duration,
    });
  };

  const showInfo = (message: string, title?: string, duration?: number) => {
    return addToast({
      type: 'info',
      message,
      title,
      duration,
    });
  };

  return {
    showSuccess,
    showError,
    showWarning,
    showInfo,
    removeToast,
    clearAllToasts,
  };
};
