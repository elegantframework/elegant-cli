import type { Meta, StoryObj } from '@storybook/react';
import AdminHeader from './AdminHeader';

const meta: Meta<typeof AdminHeader> = {
  title: 'Core/Headers/Admin Header',
  component: AdminHeader,
};

export default meta;

type Story = StoryObj<typeof AdminHeader>;

export const Default: Story = {
  args: {
  },
};