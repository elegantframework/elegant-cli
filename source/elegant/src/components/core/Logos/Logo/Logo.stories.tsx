import type { Meta, StoryObj } from '@storybook/react';

import Logo  from './Logo';

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof Logo> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Core/Logos/App Logo',
  component: Logo,
};

export default meta;
type Story = StoryObj<typeof Logo>;

export const AppLogo: Story = {
  args: {
    //👇 The args you need here will depend on your component
  },
};