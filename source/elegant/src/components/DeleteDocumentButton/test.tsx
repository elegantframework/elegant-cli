import { render, screen } from '@testing-library/react';
import React from 'react';
import { TestWrapper } from '@/utils/TestWrapper';
import { useCMSSession } from '@/utils/Auth/hooks';
import DeleteDocumentButton from '.';

jest.mock('@/utils/Auth/hooks')

describe('<DeleteDocumentButton />', () => {
  it('should render the button', () => {
    (useCMSSession as jest.Mock).mockReturnValue({
      session: {
        user: {
          username: 'avitorio'
        }
      },
      status: 'authenticated'
    })

    render(
      <TestWrapper>
        <DeleteDocumentButton
          slug={'a-post'}
          disabled={false}
          collection="posts"
        />
      </TestWrapper>
    )

    expect(screen.getByRole('button', { name: /Delete/i })).toBeInTheDocument()
  })
})
