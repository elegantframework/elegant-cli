import type { Meta, StoryObj } from '@storybook/react';
import SplashHeader from './SplashHeader';

const meta: Meta<typeof SplashHeader> = {
  title: 'Core/Headers/Splash Header',
  component: SplashHeader,
};

export default meta;

type Story = StoryObj<typeof SplashHeader>;

export const Default: Story = {
  args: {
    beams: false,
    gitHubUrl: "",
    appName: "Storybook",
    navigationItems: [
      {
          href: "/docs/installation",
          path: "/docs/",
          label: "Docs",        
      },
      {
          href: "/blog",
          path: "/blog",
          label: "Blog",        
      }
    ]
  },
};