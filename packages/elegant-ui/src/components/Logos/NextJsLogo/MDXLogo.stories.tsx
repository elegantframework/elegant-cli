import type { Meta, StoryObj } from '@storybook/react';
import NextJsLogo from './NextJsLogo';

const meta: Meta<typeof NextJsLogo> = {
  title: 'Core/Logos/Next.js Logo',
  component: NextJsLogo,
};

export default meta;

type Story = StoryObj<typeof NextJsLogo>;

export const Logo: Story = {
  args: {},
};