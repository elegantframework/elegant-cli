import type { Meta, StoryObj } from '@storybook/react';
import YouTubeIcon from './YouTubeIcon';

const meta: Meta<typeof YouTubeIcon> = {
  title: 'Core/Icons/YouTube Icon',
  component: YouTubeIcon,
};

export default meta;

type Story = StoryObj<typeof YouTubeIcon>;

export const Default: Story = {
  args: {
    className: "w-5 h-5"
  },
};