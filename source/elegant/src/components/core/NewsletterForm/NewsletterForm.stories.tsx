import type { Meta, StoryObj } from '@storybook/react';
import { NewsletterForm } from './NewsletterForm';

const meta: Meta<typeof NewsletterForm> = {
  title: 'Core/Forms/Newsletter Form',
  component: NewsletterForm,
};

export default meta;

type Story = StoryObj<typeof NewsletterForm>;

export const Form: Story = {
  args: {},
};