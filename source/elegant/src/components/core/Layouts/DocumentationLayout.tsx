import { SidebarLayout } from '@/layouts/SidebarLayout';
import { documentationNav } from '@/config/Navigation';

export default function DocumentationLayout(props: any) {
  return (
    <SidebarLayout nav={documentationNav} {...props} />
  )
}

DocumentationLayout.nav = documentationNav;