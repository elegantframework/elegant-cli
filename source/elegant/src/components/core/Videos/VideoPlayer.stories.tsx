import type { Meta, StoryObj } from '@storybook/react';
import VideoPlayer from './VideoPlayer';

const meta: Meta<typeof VideoPlayer> = {
  title: 'Core/Videos/Video Player',
  component: VideoPlayer,
};

export default meta;

type Story = StoryObj<typeof VideoPlayer>;

export const Default: Story = {
  args: {
    title: "How to get started with Elegant.",
    description: "A detailed guide on how to get started with Elegant.",
    embed_url: "https://www.youtube.com/embed/bS66QUBKljM",
    content_url: "https://youtu.be/bS66QUBKljM"
  },
};