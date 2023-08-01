import type { Meta, StoryObj } from '@storybook/react';
import TailwindCSSLogo from './TailwindCSSLogo';

const meta: Meta<typeof TailwindCSSLogo> = {
  title: 'Core/Logos/Tailwind CSS Logo',
  component: TailwindCSSLogo,
};

export default meta;

type Story = StoryObj<typeof TailwindCSSLogo>;

export const Logo: Story = {
  args: {},
};