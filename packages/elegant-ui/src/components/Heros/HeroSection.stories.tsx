import type { Meta, StoryObj } from '@storybook/react';
import HeroSection from './HeroSection';

const meta: Meta<typeof HeroSection> = {
  title: 'Core/Heros/Hero Section',
  component: HeroSection,
};

export default meta;

type Story = StoryObj<typeof HeroSection>;

export const Default: Story = {
  args: {
    heading: "Hello World",
    children: <>
         <p className="mt-4 text-3xl sm:text-4xl text-slate-900 font-extrabold tracking-tight dark:text-slate-50">
            Hello World
        </p>
        <p className="mt-4 max-w-3xl space-y-6">
            A hero section is the perfect reusable component for landing pages.
        </p>
    </>
  },
};