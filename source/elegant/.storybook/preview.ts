import type { Preview } from '@storybook/react';
import "./../src/css/main.css";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    options: {
      storySort: {
        method: 'alphabetical',
        order: [],
        locales: '',
      },
    },
    darkMode: {
      current: 'light',
      classTarget: 'html',
      stylePreview: true
    }
  },
}

export default preview
