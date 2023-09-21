import { render, renderHook } from '@testing-library/react';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import FloatingMenu from './FloatingMenu';

describe('Editor floating menu', () => {
  it('should render the heading', () => {
    const { result } = renderHook(() =>
      useEditor({
        extensions: [StarterKit],
        content: 'Anything'
      })
    )

    render(
      <div>{result.current && <FloatingMenu editor={result.current} />}</div>
    )
  })
});