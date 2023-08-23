import type { Meta, StoryObj } from '@storybook/react';
import { DocumentationHeading } from './DocumentationHeading';

const meta: Meta<typeof DocumentationHeading> = {
  title: 'Core/Headings/Documentation Heading',
  component: DocumentationHeading,
};

export default meta;

type Story = StoryObj<typeof DocumentationHeading>;

export const Heading: Story = {
  args: {
    title: "Documentation Heading",
    description: "This is the Documentation Heading Component.",
    section: "Hello World"
  },
};