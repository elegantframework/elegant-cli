import type { Meta, StoryObj } from '@storybook/react';
import DropdownSelector from './DropdownSelector';

const meta: Meta<typeof DropdownSelector> = {
  title: 'Core/Selectors/Dropdown Selector',
  component: DropdownSelector,
};

export default meta;
type Story = StoryObj<typeof DropdownSelector>;

export const Primary: Story = {
  args: {
    selected: "Options"
  },
};