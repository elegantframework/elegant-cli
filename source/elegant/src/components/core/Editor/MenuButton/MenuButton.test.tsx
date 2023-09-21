import { render, screen, renderHook } from '@testing-library/react'
import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import MenuButton from './MenuButton'

describe('Editor menu button', () => {
  it('should render the button', () => {
    const { result } = renderHook(() =>
      useEditor({
        extensions: [StarterKit],
        content: 'Anything'
      })
    )

    render(
      <>
        {result.current && (
          <MenuButton name="bold" onClick={() => {}} editor={result.current}>
            Bold
          </MenuButton>
        )}
      </>
    )

    expect(screen.getByText(/bold/i)).toBeInTheDocument()
  })
})
