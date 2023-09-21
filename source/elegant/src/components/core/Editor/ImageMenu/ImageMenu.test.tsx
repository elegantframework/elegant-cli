import { render, renderHook, screen } from '@testing-library/react';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import ImageMenu from './ImageMenu';

describe('Editor image menu component', () => {
  it('should render theImageMenu', () => {
    const { result } = renderHook(() =>
      useEditor({
        extensions: [StarterKit],
        content: 'Anything'
      })
    )
    render(
      <div>
        {result.current && (
          <ImageMenu editor={result.current} setImageSelected={() => {}} />
        )}
      </div>
    )

    expect(screen.getByRole('button', { name: /link/i })).t

    expect(
      screen.getByRole('button', { name: /alt text/i })
    ).toBeInTheDocument()

    expect(
      screen.getByRole('button', { name: /remove image/i })
    ).toBeInTheDocument()
  })
})