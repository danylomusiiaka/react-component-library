import { Toast } from '@/components/Toast/Toast';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Toast> = {
  title: 'Components/Toast',
  component: Toast,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Success: Story = {
  args: {
    id: '1',
    type: 'success',
    title: 'Success',
    message: 'Your action was completed successfully',
  },
  decorators: [
    (Story) => (
      <div className="relative h-32">
        <Story />
      </div>
    ),
  ],
};

export const Error: Story = {
  args: {
    id: '2',
    type: 'error',
    title: 'Error',
    message: 'Something went wrong. Please try again.',
  },
  decorators: [
    (Story) => (
      <div className="relative h-32">
        <Story />
      </div>
    ),
  ],
};

export const Warning: Story = {
  args: {
    id: '3',
    type: 'warning',
    title: 'Warning',
    message: 'Please check your input before proceeding',
  },
  decorators: [
    (Story) => (
      <div className="relative h-32">
        <Story />
      </div>
    ),
  ],
};

export const Info: Story = {
  args: {
    id: '4',
    type: 'info',
    title: 'Information',
    message: 'New information is available for you',
  },
  decorators: [
    (Story) => (
      <div className="relative h-32">
        <Story />
      </div>
    ),
  ],
};
