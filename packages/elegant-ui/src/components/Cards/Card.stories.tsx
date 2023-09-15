import type { Meta, StoryObj } from '@storybook/react';
import Card from './Card';
import React from 'react';

const meta: Meta<typeof Card> = {
  title: 'Core/Cards/Card',
  component: Card,
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    children: [
        <div>
            Hello World
        </div>
    ]
  },
};