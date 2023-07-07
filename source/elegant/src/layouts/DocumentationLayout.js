import { SidebarLayout } from '@/layouts/SidebarLayout';
import { documentationNav } from '@/config/navigation';

export function DocumentationLayout(props) {
  return (
    <>
      <SidebarLayout nav={documentationNav} {...props} />
    </>
  )
}

DocumentationLayout.nav = documentationNav;