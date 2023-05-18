import type { Meta, StoryObj } from '@storybook/react';
import GitHubIcon from './GitHubIcon';

const meta: Meta<typeof GitHubIcon> = {
  title: 'Core/Icons/GitHub Icon',
  component: GitHubIcon,
};

export default meta;

type Story = StoryObj<typeof GitHubIcon>;

export const Default: Story = {
  args: {
    className: "w-5 h-5"
  },
};