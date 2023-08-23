import { createPageList } from '@/utils/createPageList';

// map our documentation files to a page
const pages = createPageList(
  require.context(`../../_content/docs/?meta=title,shortTitle,published`, false, /\.mdx$/),
  'docs'
);

const staticPages = createPageList(
  require.context(`../pages/docs/?meta=title,shortTitle,published`, false, /\.mdx$/),
  'docs'
);

export const documentationNav = {
  'Prologue': [
    pages['release-notes'],
    pages['upgrade'],
    pages['contribution-guide']
  ],
  'Getting Started': [
    staticPages['installation'],
    pages['configuration'],
    pages['new-documents'],
    pages['deployment']
  ],
  'Customization': [
    pages['theme']
  ],
  'Plugins': [
    pages['convertkit'],
    pages['google-analytics']
  ]
}
