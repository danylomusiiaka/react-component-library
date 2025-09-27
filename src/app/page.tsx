'use client';
import { Input } from '@/components/Input/Input';
import {
  SidebarProvider,
  useSidebar,
} from '@/components/Sidebar/Sidebar.context';
import {
  ToastProvider,
  useToastActions,
} from '@/components/Toast/ToastContext';
import { menuItems } from '@/data/menuItems';

function LibraryDemo() {
  const { showSuccess, showError, showWarning, showInfo } = useToastActions();
  const { openSidebar } = useSidebar();

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] p-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold mb-4 md:mb-8">
          React Component Library
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          {/* Input Component */}
          <div className="bg-[var(--card-bg)] text-[var(--card-text)] rounded-xl shadow-lg p-6 transition-colors duration-300">
            <h2 className="text-2xl font-semibold mb-4">Input Component</h2>
            <div className="space-y-4">
              <Input placeholder="Enter text" clearable />
              <Input type="password" placeholder="Enter password" clearable />
            </div>
          </div>

          {/* Toast Component */}
          <div className="bg-[var(--card-bg)] text-[var(--card-text)] rounded-xl shadow-lg p-6 transition-colors duration-300">
            <h2 className="text-2xl font-semibold mb-4">Toast Component</h2>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() =>
                  showSuccess('Your action was successful', 'Success!', 5000)
                }
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm"
              >
                Success
              </button>
              <button
                onClick={() => showError('Something went wrong', 'Error', 5000)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
              >
                Error
              </button>
              <button
                onClick={() =>
                  showWarning('Please check your input', 'Warning', 5000)
                }
                className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors text-sm"
              >
                Warning
              </button>
              <button
                onClick={() =>
                  showInfo('New information is available', 'Information', 5000)
                }
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
              >
                Info
              </button>
            </div>
          </div>

          {/* Sidebar Component */}
          <div className="bg-[var(--card-bg)] text-[var(--card-text)] rounded-xl shadow-lg p-6 transition-colors duration-300">
            <h2 className="text-2xl font-semibold mb-4">Sidebar Component</h2>
            <button
              onClick={openSidebar}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors w-full"
            >
              Open Sidebar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <SidebarProvider items={menuItems} title="Navigation">
      <ToastProvider>
        <LibraryDemo />
      </ToastProvider>
    </SidebarProvider>
  );
}
