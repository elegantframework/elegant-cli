import { useContext } from 'react';
import { useDocumentQuery } from '@/graphql/generated';
import { useCMSSession } from '../Auth/hooks';
import { CMSContext } from '../Context';

type useFileQueryProps = {
  file: string
  skip?: boolean
}

const useFileQuery = ({ file, skip = false }: useFileQueryProps) => {
  const { 
    repoOwner, 
    repoSlug, 
    repoBranch, 
    contentPath,
    monorepoPath 
  } = useContext(CMSContext);
  const { session } = useCMSSession()
  const data = useDocumentQuery({
    variables: {
      owner: repoOwner || session?.user?.login || '',
      name: repoSlug,
      filePath: `${repoBranch}:${
        monorepoPath
      }${contentPath}/${file}`
    },
    fetchPolicy: 'network-only',
    skip
  })

  return data
}

export default useFileQuery
