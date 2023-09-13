import type { Meta, StoryObj } from '@storybook/react';
import MoonIcon from './MoonIcon';

const meta: Meta<typeof MoonIcon> = {
  title: 'Core/Icons/Moon Icon',
  component: MoonIcon,
};

export default meta;

type Story = StoryObj<typeof MoonIcon>;

export const Default: Story = {
  args: {
    className: "w-6 h-6",
    selected: false
  },
};