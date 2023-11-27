import type { Meta, StoryObj } from '@storybook/react';
import MDXLogo from './MDXLogo';

const meta: Meta<typeof MDXLogo> = {
  title: 'Core/Logos/MDX Logo',
  component: MDXLogo,
};

export default meta;

type Story = StoryObj<typeof MDXLogo>;

export const Logo: Story = {
  args: {},
};