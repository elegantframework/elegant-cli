import { HttpResponse, graphql } from 'msw';

export const handlers = [
  graphql.query('Collections', ({ variables }) => {
    const { owner } = variables;

    if (owner === 'msw::collections::not-implemented') {
      return HttpResponse.json({
        errors: [{ message: 'MSW - Not implemented' }],
      });
    }

    return HttpResponse.json({
      data: {
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
      }
    });
  })
]
