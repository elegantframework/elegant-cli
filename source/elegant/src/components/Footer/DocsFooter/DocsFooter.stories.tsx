import type { Meta, StoryObj } from '@storybook/react';
import DocsFooter from './DocsFooter';

const meta: Meta<typeof DocsFooter> = {
  title: 'Core/Footer/Docs Footer',
  component: DocsFooter,
};

export default meta;

type Story = StoryObj<typeof DocsFooter>;

export const Default: Story = {
  args: {
  },
};