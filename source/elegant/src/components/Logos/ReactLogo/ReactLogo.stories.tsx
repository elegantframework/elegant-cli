import type { Meta, StoryObj } from '@storybook/react';

import ReactLogo  from './ReactLogo';

const meta: Meta<typeof ReactLogo> = {
  title: 'Core/Logos/React Logo',
  component: ReactLogo,
};

export default meta;
type Story = StoryObj<typeof ReactLogo>;

export const Logo: Story = {
  args: {},
};