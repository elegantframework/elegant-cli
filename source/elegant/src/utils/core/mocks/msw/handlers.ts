import { graphql } from 'msw';

export const handlers = [
  // Collections query. Use the owner to determine the possible response
  // to get from GitHub's API
  graphql.query('Collections', (req, res, ctx) => {
    const { owner } = req.variables

    if (owner === 'msw::collections::not-implemented') {
      return res(
        ctx.errors([
          {
            message: 'MSW - Not implemented'
          }
        ])
      )
    }
    
    return res(
      ctx.data({
        repository: {
          id: 'R_kgDOID1vsA',
          object: {
            __typename: 'Tree',
            entries: [
              {
                type: 'tree',
                name: 'pages'
              },
              {
                type: 'tree',
                name: 'posts'
              },
              {
                type: 'tree',
                name: 'projects'
              }
            ]
          }
        }
      })
    )
  })
]
