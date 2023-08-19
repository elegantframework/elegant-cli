import type { Meta, StoryObj } from '@storybook/react';
import BuiltWithElegant from './BuiltWithElegant';

const meta: Meta<typeof BuiltWithElegant> = {
  title: 'Core/Marks/Built with Elegant',
  component: BuiltWithElegant,
};

export default meta;
type Story = StoryObj<typeof BuiltWithElegant>;

export const Primary: Story = {
  args: {},
};