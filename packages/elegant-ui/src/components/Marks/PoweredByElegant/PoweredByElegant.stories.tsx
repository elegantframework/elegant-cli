import type { Meta, StoryObj } from '@storybook/react';
import PoweredByElegant from './PoweredByElegant';

const meta: Meta<typeof PoweredByElegant> = {
  title: 'Core/Marks/Powered by Elegant',
  component: PoweredByElegant,
};

export default meta;
type Story = StoryObj<typeof PoweredByElegant>;

export const Primary: Story = {
  args: {
    //👇 The args you need here will depend on your component
  },
};