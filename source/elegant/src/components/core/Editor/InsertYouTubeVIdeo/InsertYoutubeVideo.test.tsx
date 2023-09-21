import { render, renderHook, screen } from '@testing-library/react';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import InsertYouTubeVIdeo from './InsertYouTubeVIdeo';

describe('Editor insert youtube video', () => {
  it('should render the tiptap editor insert youtube video component', () => {
    const { result } = renderHook(() =>
      useEditor({
        extensions: [StarterKit],
        content: 'Anything'
      })
    )
    render(
      <div>
        {result.current && (
          <InsertYouTubeVIdeo editor={result.current} setImageMenu={() => {}} />
        )}
      </div>
    )

    expect(
      screen.getByRole('button', { name: /from link/i })
    ).toBeInTheDocument()
  })
})
