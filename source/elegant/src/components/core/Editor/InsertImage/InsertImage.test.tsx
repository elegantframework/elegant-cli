import { render, renderHook, screen } from '@testing-library/react';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import InsertImage from './InsertImage';

describe('Editor insert image', () => {
  it('should render the tiptap editor InsertImage', () => {
    const { result } = renderHook(() =>
      useEditor({
        extensions: [StarterKit],
        content: 'Anything'
      })
    )
    render(
      <div>
        {result.current && (
          <InsertImage editor={result.current} setImageMenu={() => {}} />
        )}
      </div>
    )

    expect(
      screen.getByRole('button', { name: /from link/i })
    ).toBeInTheDocument()
  })
})
