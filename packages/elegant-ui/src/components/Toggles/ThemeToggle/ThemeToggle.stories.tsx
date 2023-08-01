import type { Meta, StoryObj } from '@storybook/react';
import ThemeToggle from './ThemeToggle';


const meta: Meta<typeof ThemeToggle> = {
  title: 'Core/Toggles/Theme Toggle',
  component: ThemeToggle,
};

export default meta;

type Story = StoryObj<typeof ThemeToggle>;

export const Default: Story = {
  args: {
    panelClassName: "mt-4"
  },
};