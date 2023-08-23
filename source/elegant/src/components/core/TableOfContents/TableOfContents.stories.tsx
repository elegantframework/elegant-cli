import type { Meta, StoryObj } from '@storybook/react';
import TableOfContents from './TableOfContents';

const meta: Meta<typeof TableOfContents> = {
  title: 'Core/Table of Contents/Table of Contents',
  component: TableOfContents,
};

export default meta;

type Story = StoryObj<typeof TableOfContents>;

export const Default: Story = {
  args: {
    
  },
};