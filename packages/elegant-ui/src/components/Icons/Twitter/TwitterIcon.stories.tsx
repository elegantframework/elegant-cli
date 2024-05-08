import type { Meta, StoryObj } from "@storybook/react";
import TwitterIcon from "./TwitterIcon";

const meta: Meta<typeof TwitterIcon> = {
  title: "Core/Icons/Twitter Icon",
  component: TwitterIcon,
};

export default meta;

type Story = StoryObj<typeof TwitterIcon>;

export const Default: Story = {
  args: {
    className: "w-5 h-5",
  },
};
