import { SidebarLayout } from '@/components/core/Layouts/SidebarLayout';
import { documentationNavNew } from '@/config/Navigation';

export default function DocumentationLayout(props: any) {
  return (
    <SidebarLayout nav={documentationNavNew} {...props} />
  )
}

DocumentationLayout.nav = documentationNavNew;
