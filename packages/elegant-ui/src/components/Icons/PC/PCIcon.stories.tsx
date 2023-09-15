import type { Meta, StoryObj } from '@storybook/react';
import PCIcon from './PCIcon';

const meta: Meta<typeof PCIcon> = {
  title: 'Core/Icons/PC Icon',
  component: PCIcon,
};

export default meta;

type Story = StoryObj<typeof PCIcon>;

export const Default: Story = {
  args: {
    className: "w-6 h-6",
    selected: false
  },
};