import type { Meta, StoryObj } from '@storybook/react';
import TrashIcon from './TrashIcon';

const meta: Meta<typeof TrashIcon> = {
  title: 'Core/Icons/Trash Icon',
  component: TrashIcon,
};

export default meta;

type Story = StoryObj<typeof TrashIcon>;

export const Default: Story = {
  args: {
    className: "w-5 h-5"
  },
};