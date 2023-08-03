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

export const OutstaticContext = createContext({
  repoOwner: '',
  repoSlug: '',
  repoBranch: '',
  contentPath: '',
  monorepoPath: '',
  session: null
} as Omit<Props, 'client'>)

export const OutstaticProvider = ({
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
    <OutstaticContext.Provider
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
    </OutstaticContext.Provider>
  )
}

export const DocumentContext = createContext<DocumentContextType>(
  {} as DocumentContextType
);