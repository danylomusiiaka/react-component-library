import React, { useEffect, useState } from 'react';
import { X, ChevronRight, ChevronDown } from 'lucide-react';

export interface MenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  href?: string;
  children?: MenuItem[];
}

export interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items: MenuItem[];
  title?: string;
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  items,
  title = 'Menu',
  className = '',
}) => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const toggleExpanded = (itemId: string) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const renderMenuItem = (item: MenuItem, level = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.has(item.id);
    const paddingLeft = level * 20 + 16;

    return (
      <div key={item.id}>
        <div
          className={`
            flex items-center justify-between px-4 py-3 cursor-pointer
            hover:bg-gray-100 transition-colors duration-200
            ${level > 0 ? 'border-l-2 border-gray-200 ml-4' : ''}
          `}
          style={{ paddingLeft: `${paddingLeft}px` }}
          onClick={() => {
            if (hasChildren) {
              toggleExpanded(item.id);
            } else if (item.href) {
              onClose();
            }
          }}
        >
          <div className="flex items-center space-x-3">
            {item.icon && (
              <div className="flex-shrink-0 text-gray-600">{item.icon}</div>
            )}
            <span className="text-gray-800 font-medium">{item.label}</span>
          </div>

          {hasChildren && (
            <div className="flex-shrink-0 text-gray-400">
              {isExpanded ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </div>
          )}
        </div>

        {hasChildren && isExpanded && (
          <div className="overflow-hidden">
            <div className="transition-all duration-300 ease-in-out">
              {item.children!.map((child) => renderMenuItem(child, level + 1))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
          onClick={handleBackdropClick}
        />
      )}

      <div
        className={`
          fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-50
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
          ${className}
        `}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
          <button
            onClick={onClose}
            className="
              p-2 rounded-md text-gray-400 hover:text-gray-600 
              hover:bg-gray-100 transition-colors duration-200
            "
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4">
          {items.map((item) => renderMenuItem(item))}
        </div>
      </div>
    </>
  );
};
