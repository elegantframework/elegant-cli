import type { Meta, StoryObj } from '@storybook/react';
import NavItems from './NavItems';

const meta: Meta<typeof NavItems> = {
  title: 'Core/Navigation/Nav Items',
  component: NavItems
};

export default meta;

type Story = StoryObj<typeof NavItems>;

export const Default: Story = {
  args: {
    navItems: [
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