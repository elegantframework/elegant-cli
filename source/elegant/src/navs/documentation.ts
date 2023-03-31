import { createPageList } from '@/utils/createPageList';

// map our documentation files to a page
const pages = createPageList(
  require.context(`../pages/docs/?meta=title,shortTitle,published`, false, /\.mdx$/),
  'docs'
);

export const documentationNav = {
  'Prologue': [
    pages['release-notes'],
    pages['contribution-guide']
  ],
  'Getting Started': [
    pages['installation'],
    pages['configuration'],
    pages['new-documents']
  ],
}
