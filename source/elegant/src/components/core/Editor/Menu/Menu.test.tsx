import { render, renderHook } from '@testing-library/react';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Menu from './Menu';

describe('The editor menu component', () => {
  it('should render the heading', () => {
    const { result } = renderHook(() =>
      useEditor({
        extensions: [StarterKit],
        content: 'Anything'
      })
    )

    render(
        <div>{result.current && <Menu editor={result.current} />}</div>
    );
  })
})
