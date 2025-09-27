import { Sidebar } from '@/components/Sidebar/Sidebar';
import {
  SidebarProvider,
  useSidebar,
} from '@/components/Sidebar/Sidebar.context';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { menuItems } from '@/data/menuItems';

const meta: Meta<typeof Sidebar> = {
  title: 'Components/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    items: menuItems,
    title: 'Navigation',
  },
  decorators: [
    (Story) => (
      <div className="relative h-96">
        <Story />
      </div>
    ),
  ],
};

export const Demo: Story = {
  render: () => {
    const SidebarDemo = () => {
      const { openSidebar } = useSidebar();

      return (
        <div className="p-6 space-y-4">
          <h2 className="text-2xl font-bold mb-4">Sidebar Demo</h2>

          <div className="space-x-4">
            <button
              onClick={openSidebar}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Open Sidebar
            </button>
          </div>
        </div>
      );
    };

    return (
      <SidebarProvider items={menuItems} title="Navigation">
        <SidebarDemo />
      </SidebarProvider>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Демонстрація Sidebar з Context API для управління станом.',
      },
    },
  },
};
