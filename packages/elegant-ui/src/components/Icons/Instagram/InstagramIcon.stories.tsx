import type { Meta, StoryObj } from "@storybook/react";
import InstagramIcon from "./InstagramIcon";

const meta: Meta<typeof InstagramIcon> = {
  title: "Core/Icons/Instagram Icon",
  component: InstagramIcon,
};

export default meta;

type Story = StoryObj<typeof InstagramIcon>;

export const Default: Story = {
  args: {
    className: "w-5 h-5",
  },
};
