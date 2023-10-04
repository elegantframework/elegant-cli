import { render, screen } from '@testing-library/react';
import Sidebar from './Sidebar';
import { CMSProvider } from '@/utils/Context';

const providerData = {
  repoOwner: 'anything',
  repoSlug: 'anything',
  repoBranch: 'anything',
  contentPath: 'anything',
  monorepoPath: 'anything',
  session: null,
  initialApolloState: null,
  collections: ['posts', 'docs'],
  pages: [],
  addPage: (page: string) => {},
  removePage: (page: string) => {}
}

describe('<Sidebar />', () => {
  it('should render the heading', () => {
    render(
      <CMSProvider {...providerData}>
        <Sidebar isOpen={false} />
      </CMSProvider>
    )
    expect(screen.getByText(/Posts/i)).toBeInTheDocument()
    expect(screen.getByText(/Settings/i)).toBeInTheDocument()
  })
})
