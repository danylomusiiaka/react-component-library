'use client';
import { Input } from '@/components/Input/Input';
import {
  ToastProvider,
  useToastActions,
} from '@/components/Toast/ToastContext';

function LibraryDemo() {
  const { showSuccess, showError, showWarning, showInfo } = useToastActions();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          React Component Library
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Input Component
            </h2>
            <div className="space-y-4">
              <Input placeholder="Enter text" clearable />
              <Input type="password" placeholder="Enter password" clearable />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Toast Component
            </h2>
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
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <ToastProvider>
      <LibraryDemo />
    </ToastProvider>
  );
}
