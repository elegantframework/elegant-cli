import type { Meta, StoryObj } from '@storybook/react';
import VersionSelector from './VersionSelector';

const meta: Meta<typeof VersionSelector> = {
  title: 'Core/Selectors/Version Selector',
  component: VersionSelector,
};

export default meta;
type Story = StoryObj<typeof VersionSelector>;

export const Primary: Story = {
  args: {
    version: "1.3.1",
    pastVersions: [
      {
        label: "1.2.1",
        href: "https://v1.elegantframework.com"
      },
      {
        label: "1.1.4",
        href: "https://v1.elegantframework.com"
      }
    ]
  },
};