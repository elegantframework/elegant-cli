import type { Preview } from '@storybook/react';
import '../src/styles.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
      darkMode: {
        current: 'light',
        stylePreview: true,
        classTarget: 'html'
      },
    },
  },
  decorators: [
  ],
};

export default preview;
