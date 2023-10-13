import type { Meta, StoryObj } from '@storybook/react';
import NavItem from './NavItem';

const meta: Meta<typeof NavItem> = {
  title: 'Core/Sidebar/Skyline/Nav Item',
  component: NavItem
};

export default meta;

type Story = StoryObj<typeof NavItem>;

export const Default: Story = {
  args: {
    href: "/hello/world",
    isActive: true,
    label: "Hello World"
  }
};