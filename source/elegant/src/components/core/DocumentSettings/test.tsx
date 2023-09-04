import { render, screen } from '@testing-library/react';
import React from 'react';
import { TestWrapper } from '@/utils/core/TestWrapper';
import { useCMSSession } from '@/utils/core/Auth/hooks';
import DocumentSettings from '.';
import mockRouter from 'next-router-mock';

jest.mock('@/utils/core/Auth/hooks');
jest.mock('next/router', () => jest.requireActual('next-router-mock'));

jest.mock('react-hook-form', () => ({
  ...jest.requireActual('react-hook-form'),
  register: jest.fn(),
  handleSubmit: jest.fn()
}))

describe('<DocumentSettings />', () => {
  it('should render the date', async () => {
    ;(useCMSSession as jest.Mock).mockReturnValue({
      session: {
        user: {
          username: 'avitorio'
        }
      },
      status: 'authenticated'
    })
    render(
      <TestWrapper>
        <DocumentSettings
          saveFunc={() => {}}
          loading={false}
          showDelete={false}
        />
      </TestWrapper>
    )

    expect(screen.getByText('July 14, 2022')).toBeInTheDocument()
  })
})
