import { Session } from '@/types/Index';
import {
  ApolloClient,
  from,
  createHttpLink,
  InMemoryCache,
  NormalizedCacheObject
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import fetch from 'cross-fetch';
import { useMemo } from 'react';

let apolloClient: ApolloClient<NormalizedCacheObject | null>

const apolloCache = new InMemoryCache({
  typePolicies: {}
})

async function getSession() {
  const response = await fetch('/api/admin/user')
  return response.json()
}

function createApolloClient(session?: Session | null) {
  const httpLink = createHttpLink({
    uri: 'https://api.github.com/graphql',
    // Prefer explicit `window.fetch` when available so that outgoing requests
    // are captured and deferred until the Service Worker is ready. If no window
    // or window.fetch, default to cross-fetch's ponyfill
    fetch: (...args) =>
      (typeof window !== 'undefined' && typeof window.fetch === 'function'
        ? window.fetch
        : fetch)(...args)
  })

  // @ts-ignore
  const authLink = setContext(async (_, { headers }: { headers: Headers }) => {
    const data: { session: Session } = session
      ? { session }
      : await getSession()
    const modifiedHeader = {
      headers: {
        ...headers,
        authorization: data.session?.access_token
          ? `Bearer ${data.session.access_token}`
          : ''
      }
    }
    return modifiedHeader
  })

  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: from([authLink, httpLink]),
    cache: apolloCache
  })
}

export function initializeApollo(
  initialState = null,
  session?: Session | null
) {
  const apolloClientGlobal = apolloClient ?? createApolloClient(session)

  if (initialState) {
    apolloClientGlobal.cache.restore(initialState)
  }

  if (typeof window === 'undefined'){
    return apolloClientGlobal;
  }

  apolloClient = apolloClient ?? apolloClientGlobal

  return apolloClient;
}

export function useApollo(initialState = null, session?: Session) {
  const store = useMemo(
    () => initializeApollo(initialState, session),
    [initialState, session]
  )
  return store
}
