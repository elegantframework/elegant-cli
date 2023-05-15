import type { Meta, StoryObj } from '@storybook/react';
import SunIcon from './SunIcon';

const meta: Meta<typeof SunIcon> = {
  title: 'Core/Icons/Sun Icon',
  component: SunIcon,
};

export default meta;

type Story = StoryObj<typeof SunIcon>;

export const Default: Story = {
  args: {
    className: "w-6 h-6",
    selected: false
  },
};