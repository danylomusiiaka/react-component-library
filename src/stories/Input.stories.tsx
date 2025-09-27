import { Input } from '@/components/Input/Input';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Input>;

export const TextInput: Story = {
  args: {
    type: 'text',
    placeholder: 'Text input',
    clearable: false,
  },
};

export const TextInputClearable: Story = {
  args: {
    type: 'text',
    placeholder: 'Text input clearable',
    clearable: true,
  },
};

export const PasswordInput: Story = {
  args: {
    type: 'password',
    placeholder: 'Password',
    clearable: false,
  },
};

export const PasswordInputClearable: Story = {
  args: {
    type: 'password',
    placeholder: 'Password clearable',
    clearable: true,
  },
};

export const NumberInput: Story = {
  args: {
    type: 'number',
    placeholder: 'Number input',
    clearable: true,
  },
};
