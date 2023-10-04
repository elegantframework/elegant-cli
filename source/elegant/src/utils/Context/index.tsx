import { DocumentContextType, Session } from '@/types/Index';
import { createContext } from 'react';

type Props = {
  children?: React.ReactNode
  repoOwner: string
  repoSlug: string
  repoBranch: string
  contentPath: string
  monorepoPath: string
  session: Session | null
  initialApolloState?: null
  collections: string[]
  pages: string[]
  addPage: (page: string) => void
  removePage: (page: string) => void
}

export const CMSContext = createContext({
  repoOwner: '',
  repoSlug: '',
  repoBranch: '',
  contentPath: '',
  monorepoPath: '',
  session: null
} as Omit<Props, 'client'>)

export const CMSProvider = ({
  children,
  repoOwner,
  repoSlug,
  repoBranch,
  contentPath,
  monorepoPath,
  session,
  collections,
  pages,
  addPage,
  removePage
}: Props) => {
  return (
    <CMSContext.Provider
      value={{
        repoOwner: repoOwner || '',
        repoSlug: repoSlug || '',
        repoBranch: repoBranch || 'main',
        contentPath: contentPath || '_content',
        monorepoPath: monorepoPath || '',
        session,
        collections,
        pages,
        addPage,
        removePage
      }}
    >
      {children}
    </CMSContext.Provider>
  )
}

export const DocumentContext = createContext<DocumentContextType>(
  {} as DocumentContextType
);