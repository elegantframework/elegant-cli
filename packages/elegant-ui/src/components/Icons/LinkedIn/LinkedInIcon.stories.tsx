import type { Meta, StoryObj } from "@storybook/react";
import LinkedInIcon from "./LinkedInIcon";

const meta: Meta<typeof LinkedInIcon> = {
  title: "Core/Icons/LinkedIn Icon",
  component: LinkedInIcon,
};

export default meta;

type Story = StoryObj<typeof LinkedInIcon>;

export const Default: Story = {
  args: {
    className: "w-5 h-5",
  },
};
