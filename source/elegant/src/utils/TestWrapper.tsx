import { MockedProvider } from '@apollo/client/testing';
import { Editor, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { ReactNode } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { OidDocument } from '@/graphql/generated';
import { Document } from '@/types/Document';
import { DocumentContext } from './Context';

const documentExample: Document = {
  publishedAt: new Date('2022-07-14'),
  title: 'Example Document',
  content: 'Example Content',
  status: 'published',
  slug: 'document-example',
  author: {
    name: 'John Doe',
    picture: 'https://jdoe.com/picture.jpg'
  },
  tags: []
}

const mocks = [
  {
    request: {
      query: OidDocument,
      variables: {
        username: 'hello',
        repo: 'world'
      }
    },
    result: {
      data: {
        repository: {
          ref: {
            target: {
              history: {
                nodes: [
                  {
                    oid: 'abcdefghijklmnopqrstuvwxyz'
                  }
                ]
              }
            }
          }
        }
      }
    }
  }
]

export const TestWrapper = (props: { children: ReactNode }) => {
  const formMethods = useForm<FormData>()
  const editor = useEditor({
    extensions: [StarterKit]
  })

  return (
    <MockedProvider mocks={mocks} addTypename={false}>
      <DocumentContext.Provider
        value={{
          editor: editor as Editor,
          document: documentExample,
          editDocument: () => {},
          files: [],
          setFiles: () => {},
          hasChanges: false,
          collection: 'documents'
        }}
      >
        <FormProvider {...formMethods}>{props.children}</FormProvider>
      </DocumentContext.Provider>
    </MockedProvider>
  )
}
