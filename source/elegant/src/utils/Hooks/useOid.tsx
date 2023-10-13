import { useContext, useCallback } from 'react';
import { useOidLazyQuery } from '@/graphql/generated';
import { useCMSSession } from '@/utils/Auth/hooks';
import { CMSContext } from '../Context';

const useOid = () => {
  const { repoSlug, repoBranch, repoOwner } = useContext(CMSContext);
  const { session } = useCMSSession()
  const [oidQuery] = useOidLazyQuery({
    variables: {
      owner: repoOwner || session?.user?.login || '',
      name: repoSlug,
      branch: repoBranch
    },
    fetchPolicy: 'no-cache'
  })

  const fetchOid = useCallback(async () => {
    const { data: oidData, error: oidError } = await oidQuery()
    if (oidError) {
      throw oidError
    }

    if (oidData?.repository?.ref?.target?.__typename !== 'Commit') {
      throw new Error('No valid oid found')
    }

    if (
      typeof oidData.repository.ref.target.history.nodes?.[0]?.oid !== 'string'
    ) {
      throw new Error('Received a non-string oid')
    }

    return oidData.repository.ref.target.history.nodes[0].oid
  }, [oidQuery])

  return fetchOid
}

export default useOid
