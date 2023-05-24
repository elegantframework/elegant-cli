import type { Meta, StoryObj } from '@storybook/react';
import VideoPlayer from './VideoPlayer';

const meta: Meta<typeof VideoPlayer> = {
  title: 'Core/Videos/Video Player',
  component: VideoPlayer,
};

export default meta;

type Story = StoryObj<typeof VideoPlayer>;

export const Default: Story = {
  args: {},
};