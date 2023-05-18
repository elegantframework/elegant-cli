import type { Meta, StoryObj } from '@storybook/react';
import NavPopover from './NavPopover';

const meta: Meta<typeof NavPopover> = {
  title: 'Core/Navigation/Nav Popovers',
  component: NavPopover
};

export default meta;

type Story = StoryObj<typeof NavPopover>;

export const Default: Story = {
  args: {
    navigationItems: [
        {
            href: "/docs/installation",
            path: "/docs/",
            label: "Docs",        
        },
        {
            href: "/blog",
            path: "/blog",
            label: "Blog",        
        }
    ]
  },
};