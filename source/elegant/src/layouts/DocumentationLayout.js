import { SidebarLayout } from '@/layouts/SidebarLayout';
import { documentationNav } from '@/config/Navigation';

export function DocumentationLayout(props) {
  return (
    <>
      <SidebarLayout nav={documentationNav} {...props} />
    </>
  )
}

DocumentationLayout.nav = documentationNav;