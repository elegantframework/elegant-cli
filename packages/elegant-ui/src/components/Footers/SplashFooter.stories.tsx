import type { Meta, StoryObj } from '@storybook/react';
import SplashFooter from './SplashFooter';

const meta: Meta<typeof SplashFooter> = {
  title: 'Core/Footer/Splash Footer',
  component: SplashFooter,
};

export default meta;

type Story = StoryObj<typeof SplashFooter>;

export const Footer: Story = {
  args: {navigation: [
    {
      title: "Community",
      links: [
          { title: 'Indie Hackers', href: 'https://www.indiehackers.com/product/elegant-framework', external: true },
          { title: 'Twitter', href: 'https://twitter.com/thebrandonowens', external: true },
          { title: 'Reddit', href: 'https://www.reddit.com/r/elegantframework/', external: true }
      ]
    },
    {
      title: "Features",
      links: [
          { title: 'Theme Customization', href: 'https://elegantframework.com/docs/theme/' },
          { title: 'Easy Configuration', href: 'https://elegantframework.com/docs/configuration/' },
          { title: 'Affordable Hosting', href: 'https://elegantframework.com/docs/deployment/' },
          { title: 'Safe & Fast', href: 'https://elegantframework.com/blog/2023-04-20-the-future-is-markdown'}
      ]
    },
    {
      title: "Services",
      links: [
          { title: 'Google Analytics', href: 'https://elegantframework.com/docs/google-analytics/' },
      ]
    },
    {
      title: "Resources",
      links: [
          { title: 'Website Design Services', href: 'https://elegantframework.com/experts' },
      ]
    }  
  ]},
};