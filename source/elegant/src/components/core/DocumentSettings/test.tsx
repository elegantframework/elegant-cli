import { render, screen } from '@testing-library/react';
import React from 'react';
import { TestWrapper } from '@/utils/core/TestWrapper';
import { useOstSession } from '@/utils/core/Auth/hooks';
import DocumentSettings from '.';

jest.mock('@/utils/core/Auth/hooks')

jest.mock('react-hook-form', () => ({
  ...jest.requireActual('react-hook-form'),
  register: jest.fn(),
  handleSubmit: jest.fn()
}))

describe('<DocumentSettings />', () => {
  it('should render the date', async () => {
    ;(useOstSession as jest.Mock).mockReturnValue({
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
