import type { Meta, StoryObj } from "@storybook/react";

import ElegantLogo from "./ElegantLogo";

const meta: Meta<typeof ElegantLogo> = {
  title: "Core/Logos/Elegant Logo",
  component: ElegantLogo,
};

export default meta;
type Story = StoryObj<typeof ElegantLogo>;

export const Primary: Story = {
  args: {
    className: "w-auto h-8",
  },
};
