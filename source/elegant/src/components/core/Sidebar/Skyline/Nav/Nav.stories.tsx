import type { Meta, StoryObj } from '@storybook/react';
import Nav from './Nav';
import { documentationNav } from '@/config/Navigation';

const meta: Meta<typeof Nav> = {
  title: 'Core/Sidebar/Skyline/Nav',
  component: Nav
};

export default meta;

type Story = StoryObj<typeof Nav>;

export const Default: Story = {
  args: {
    mobile: false,
    nav: documentationNav
  }
};