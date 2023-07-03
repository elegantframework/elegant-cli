import { SidebarLayout } from '@/layouts/SidebarLayout';
import { documentationNav } from '@/navs/documentation';

export function DocumentationLayout(props) {
  return (
    <>
      <SidebarLayout nav={documentationNav} {...props} />
    </>
  )
}

DocumentationLayout.nav = documentationNav;