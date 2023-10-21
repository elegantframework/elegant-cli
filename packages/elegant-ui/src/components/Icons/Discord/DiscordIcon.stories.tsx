import type { Meta, StoryObj } from '@storybook/react';
import DiscordIcon from './DiscordIcon';

const meta: Meta<typeof DiscordIcon> = {
  title: 'Core/Icons/Discord Icon',
  component: DiscordIcon,
};

export default meta;

type Story = StoryObj<typeof DiscordIcon>;

export const Default: Story = {
  args: {
    className: "w-5 h-5"
  },
};