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
    techOrder: ["youtube"],
    autoplay: false,
    controls: true,
    sources: [{
        src: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        type: "video/youtube"
    }]
  },
};