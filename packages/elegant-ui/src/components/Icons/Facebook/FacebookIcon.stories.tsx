import type { Meta, StoryObj } from '@storybook/react';
import FacebookIcon from './FacebookIcon';

const meta: Meta<typeof FacebookIcon> = {
  title: 'Core/Icons/Facebook Icon',
  component: FacebookIcon,
};

export default meta;

type Story = StoryObj<typeof FacebookIcon>;

export const Default: Story = {
  args: {
    className: "w-5 h-5"
  },
};